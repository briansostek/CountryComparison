runGame();
function runGame()
{

const colors= ["#9400d3", "#4b0082", "0000ff", "00ff00","ffff00","ff7f00","ff0000"];
fetch('https://restcountries.com/v3.1/all')
  .then(response => response.json())
  .then(data => process(data));



function process(data)
{

  var score=0;

  var left= data[Math.floor(Math.random()*data.length)];
  var right= data[Math.floor(Math.random()*data.length)];
  var nerf=0;


  var gameOn=true;
  let leftDiv= document.getElementsByClassName('left')[0];
  let rightDiv= document.getElementsByClassName('right')[0];
  let leftFlag= document.getElementsByClassName('leftFlag')[0];
  let rightFlag= document.getElementsByClassName('rightFlag')[0];
  let scoreDiv= document.getElementsByClassName('score')[0];
  const dropdown= document.querySelector('.dropdown');
  let gameOver= document.getElementsByClassName('gameOver')[0];
  leftDiv.backgroundColor= colors[Math.floor(Math.random()*colors.length)];
  rightDiv.backgroundColor= colors[Math.floor(Math.random()*colors.length)];
  leftFlag.addEventListener("click", leftClicked);
  leftDiv.addEventListener("click", leftClicked);
  rightDiv.addEventListener("click", rightClicked);
  rightFlag.addEventListener("click", rightClicked);
  gameOver.addEventListener("click", restart);
  dropdown.addEventListener('change', restart);
  update();

  function leftClicked()
  {
    if(left[dropdown.value.toLowerCase()]<right[dropdown.value.toLowerCase()])
    {
      gameLost();
    }
    else //if correct
    {
      if(nerf==4)
      {
        left=right;
        nerf=0;
      }


      do
      {
        right= data[Math.floor(Math.random()*data.length)]; //generate new country;
      } while(right==left);

      score++;
      nerf++;
      update();

    }
  }

  function rightClicked()
  {
    nerf=0;
    if(left[dropdown.value.toLowerCase()]>right[dropdown.value.toLowerCase()]) //if wrong
    {
      gameLost();
    }
    else //if correct
    {
      left=right;
      right= data[Math.floor(Math.random()*data.length)]; //generate new country;
      score++;
      update();

    }
  }
  function update()
  {
    leftDiv.innerHTML= left.name+"<br>"+ dropdown.value+": " + numberWithCommas(left[dropdown.value.toLowerCase()]);
    leftFlag.src=left.flag;
    rightDiv.innerHTML=right.name;
    rightFlag.src=right.flag;
    scoreDiv.innerHTML="Score: "+score+" Mode: "+ dropdown.value;

  }
  function reset()
  {
    score=0;
    nerf=0;
    gameOver.style.visibility="hidden";
    update();
  }
  function gameLost()
  {
    nerf=0;
    gameOver.innerHTML="You Lose!! <br> "+right.name+`'s `+" "+dropdown.value+ " was "+numberWithCommas(right[dropdown.value.toLowerCase()])+"<br> Score: "+score+"<br> Click here to restart";
    gameOver.style.visibility="visible";

    score=0;
  }
  function numberWithCommas(x) {
    if(!x)
      return 0;

    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  function restart()
  {
    if(gameOver.style.visibility=="visible")
    {

      left= data[Math.floor(Math.random()*data.length)];
      do
      {
        right= data[Math.floor(Math.random()*data.length)]; //generate new country;
      } while(right==left);


    }
    reset();
  }

}


}
