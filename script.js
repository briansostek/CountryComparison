console.log("hello");
const colors= ["#9400d3", "#4b0082", "0000ff", "00ff00","ffff00","ff7f00","ff0000"];
fetch('https://restcountries.eu/rest/v2/all')
  .then(response => response.json())
  .then(data => process(data));

  function numberWithCommas(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

function process(data)
{

  var score=0;
  console.log(data[0]);
  var left= data[Math.floor(Math.random()*data.length)];
  var right= data[Math.floor(Math.random()*data.length)];
  var nerf=0;
  console.log(left);
  var gameOn=true;
  let leftDiv= document.getElementsByClassName('left')[0];
  let rightDiv= document.getElementsByClassName('right')[0];
  let leftFlag= document.getElementsByClassName('leftFlag')[0];
  let rightFlag= document.getElementsByClassName('rightFlag')[0];
  let scoreDiv= document.getElementsByClassName('score')[0];
  leftDiv.backgroundColor= colors[Math.floor(Math.random()*colors.length)];
  rightDiv.backgroundColor= colors[Math.floor(Math.random()*colors.length)];
  scoreDiv.innerHTML="Score: 0";
  leftDiv.addEventListener("click", leftClicked);
  rightDiv.addEventListener("click", rightClicked);
  update();

  function leftClicked()
  {
    if(left.population<right.population)
    {
      gameLost();
    }
    else //if correct
    {
      if(nerf==5)
      {
        left=right;
        nerf=0;
      }
      right= data[Math.floor(Math.random()*data.length)]; //generate new country;
      rightDiv.backgroundColor= colors[Math.floor(Math.random()*colors.length)];
      update();
      score++;
      nerf++;
      scoreDiv.innerHTML="Score: "+score;
    }
  }

  function rightClicked()
  {
    nerf=0;
    if(left.population>right.population) //if wrong
    {
      gameLost();
    }
    else //if correct
    {
      left=right;
      right= data[Math.floor(Math.random()*data.length)]; //generate new country;
      rightDiv.backgroundColor= colors[Math.floor(Math.random()*colors.length)];
      update();
      score++;
      scoreDiv.innerHTML="Score: "+score;
    }
  }
  function update()
  {
    leftDiv.innerHTML= left.name+"<br>Population:" + numberWithCommas(left.population);
    leftFlag.src=left.flag;
    rightDiv.innerHTML=right.name;
    rightFlag.src=right.flag;

  }
  function gameLost()
  {
    rightDiv.innerHTML="WRONG! YOU LOSE <br>"+right.name+`'s population was `+numberWithCommas(right.population);
    score=0;
  }



}
