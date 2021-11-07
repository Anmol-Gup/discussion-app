let submit=document.querySelector('#submit');
let subject=document.querySelector('#subject');
let question=document.querySelector('#question');
let newform=document.querySelector('#newform');
let questionslist=document.querySelector('.questions-list');
let formarea=document.querySelector('.formarea');
let list=document.querySelector('.list');
let noresponse=document.querySelector('.noresponse');
let responselist=document.querySelector('.responses-list');
let responseSubmit=document.querySelector('#response-submit');
let responseform=document.querySelector('.response-form');
let commentAuthor=document.querySelector('#name');
let comment=document.querySelector('#comment');
let responses=document.querySelector('.responses');
const DISCUSS='discuss';
let temp;

function setlocal(arr){
	localStorage.setItem(DISCUSS,JSON.stringify(arr));
}

function getlocal(){
  let local=localStorage.getItem(DISCUSS);
  if(local===null)
    arr=[];
  else
    arr=JSON.parse(local);
  return arr;
}

list.style.display='none';
responseform.style.display='none';
formarea.style.display='none';

// adding question form
newform.addEventListener('click',function(){
  formarea.style.display='block';
  list.style.display='none';
  responses.style.display='none';
  responseform.style.display='none';
});

// click on submit question button
submit.addEventListener('click',function(){
  
  let arr=getlocal();
  let ID=Date.now();
  arr.push([{
    quesid:ID, title:subject.value, description:question.value,
    comments:[]
  }]);

  setlocal(arr);

  document.querySelector('.noquestion').style.display='none';
  var div=document.createElement('div');
  div.setAttribute('id',ID);
  div.setAttribute('class','px-2');

  var h2=document.createElement('h2');
  var strong=document.createElement('strong');
  var hr=document.createElement('hr');
  h2.appendChild(document.createTextNode(subject.value));
  strong.innerHTML=question.value;
  
  div.appendChild(h2);
  div.appendChild(strong);
  div.appendChild(hr);
  formarea.style.display='none';
  questionslist.appendChild(div);

  question.value="";
  subject.value="";
  
  div.addEventListener('click',function(){
    responseform.style.display='block';
    temp=ID;
    showQuestion(ID);
  });
  
});

function resolveQues(id){
  let arr=getlocal();
  let value=arr.find(function(val){
    return val[0].quesid==id;
  });

  var div=document.getElementById(value[0].quesid);
  questionslist.removeChild(div);
  arr.splice(arr.indexOf(value),1);
  setlocal(arr);
  responses.style.display="none";
  list.style.display='none';
  responseform.style.display='none';
}

function showQuestion(id){

  formarea.style.display='none';
  let arr=getlocal();
  let value=arr.find(function(val){
    return val[0].quesid===id;
  });
  
  console.log(value[0]);
  document.querySelector('.list').innerHTML="";
  document.querySelector('.responses-list').innerHTML="";

  responses.style.display='block';
  let html="";
  html+=`
    <div>
      <div class="showquestions m-2">
        <h2>${value[0].title}</h2>
        <strong>${value[0].description}</strong>
      </div>
      <button class="btn btn-primary fw-bold mx-2" onclick=resolveQues(${value[0].quesid})>Resolve</button>
    </div>`;

    list.style.display='block';
    var d=document.createElement('div');
    d.innerHTML=html;
    list.appendChild(d);

    let local=value[0].comments;
    local.forEach(function(val){
      if(val.author!=='' || val.comment!=""){
        var auth=document.createElement('strong');
        auth.innerHTML=val.author;
        var com=document.createElement('p');
        
        com.innerHTML=val.comment;
        responselist.appendChild(auth);
        responselist.appendChild(com);
        noresponse.innerHTML="";
      }
    });

    responseform.style.display='block';
}

responseSubmit.addEventListener('click',function(e){
  let index;
  /*for(let i=0;i<arr.length;i++){
    if(arr[i][0].quesid===temp)
    {
      index=i;
      break;
    }
  }*/
  let value=arr.find(function(ele){
    return ele[0].quesid===temp;
  });

  const commentor= commentAuthor.value;
  const answer = comment.value;

  var name=document.createElement('strong');
  name.innerHTML=commentAuthor.value;
  var comm=document.createElement('p');
  comm.innerHTML=comment.value;

  responselist.appendChild(name);
  responselist.appendChild(comm);
    
      
  //arr[index][0].comments.push({author:commentor, comment: answer});
  value[0].comments.push({author:commentor, comment: answer});
  localStorage.setItem(DISCUSS,JSON.stringify(arr));

  commentAuthor.value='';
  comment.value='';
    
});

window.onload=function(){
  let arr=getlocal();
  if(arr.length!==0){
    
    document.querySelector('.noquestion').style.display='none';
    arr.forEach(function(val){
      var div=document.createElement('div');
      div.setAttribute('id',val[0].quesid);
      div.setAttribute('class','p-1');

      var h2=document.createElement('h2'); 
      var strong=document.createElement('strong');
      var hr=document.createElement('hr');
      h2.appendChild(document.createTextNode(val[0].title));
      h2.setAttribute('class','fs-4');
      strong.innerHTML=val[0].description;
      
      div.appendChild(h2);
      div.appendChild(strong);
      div.appendChild(hr);
      formarea.style.display='none';
      questionslist.appendChild(div);
      
      div.addEventListener('click',function(){
        //document.querySelector('.list').innerHTML="";
        //document.querySelector('.responses-list').innerHTML="";
        temp=val[0].quesid;
        showQuestion(val[0].quesid);
      });
    });
  }
  else
   document.querySelector('.noquestion').style.display='block';
};

let search=document.querySelector('#search');
search.addEventListener('keyup',function(event){

 let value=event.target.value;
 let div=questionslist.childNodes;
  
  div.forEach(function(val,index){
    if(index>2){
      var txt=val.innerText;
      if(txt.includes(value))
        val.style.display="";
      else
        val.style.display='none';
    }
  });
});

