'use strict'

document.addEventListener('DOMContentLoaded', makeJs);

function makeJs(){
  var url = 'http://localhost:8000/api/developers';
  var globalData;
  $.getJSON(url, getDevelopers)

  function getDevelopers(response){
    console.log(response)
    globalData = response;
    var main = document.getElementById('main')
    var name;
    var company;
    var experience;
    var element;
    var idDev;
    var divElement;
    var deleteDev;
    var editDev;
    for (var i= 0; i<response.length ;i++){
      name = response[i].name;
      company = response[i].company;
      experience = response[i].experience;
      idDev = response[i].id;

      element= document.createElement('article');
      divElement= document.createElement('div');
      element.className += "card";
      element.setAttribute('id', idDev);
      divElement.className += "flex";
      divElement.innerHTML = '<p class="name"><b>'+name+'</b></p> <p class="company">Company: '+company+'</p> <p class="experience"> Experience: '+experience+' years</p><p class=""></p> <div class="buttonSection"><a class="blue btn pri" id="e'+idDev+'">Edit</a><a class="red btn pri" id="d'+idDev+'">Delete</a></div>';
      element.appendChild(divElement);
      var IDD= 'd'+idDev;
      var IDE= 'e'+idDev;
      main.appendChild(element);

      deleteDev = document.getElementById(IDD);
      deleteDev.addEventListener('click', deleteDeveloper);
      editDev = document.getElementById(IDE);
      editDev.addEventListener('click', editDeveloper);
    }
  };

  function makePost(dataPost){
    $.post("http://localhost:8000/api/developers", dataPost, function(datapost,status){},'json');
    render();
  };
  function makePUT(dataPUT){
    var urlRef = 'http://localhost:8000/api/developers'
    $.ajax({
              url: urlRef,
              type: 'PUT',
              data: dataPUT,
              success: render
          });
  };

  var divDev;
  function render(){
    divDev= document.getElementById('main')
    $(divDev).empty();
    $.getJSON(url, getDevelopers);
  };

  var refId;
  var nameRef;
  function deleteDeveloper(){

    refId= this.getAttribute('id')
    refId= refId.split('');
    refId= Number(refId[1]);
    console.log(refId);
    var nameRef= prompt('¿Estas seguro de querer borrar a este developer?, si es así introduce el nombre del usuario');
    console.log(globalData);
    for (var item in globalData){
      console.log(globalData[item].name);
      if(nameRef === globalData[item].name){
          refId= globalData[item].id
          var urlRef = 'http://localhost:8000/api/developers/'+refId
          $.ajax({
                    url: urlRef,
                    type: 'DELETE',
                    success: render
                });
      };
    };
  };
  var buttonAdd = document.getElementById('BtnAddDeveloper');
  buttonAdd.addEventListener('click', expanDivAdd);
  function expanDivAdd(){
    var divAdd= document.getElementById('addDeveloper');
    $(divAdd).toggle(1000);
  };
  var formul = document.forms.formulname;
  formul.addEventListener('submit', addDeveloper);
  function addDeveloper(e){
    var form = this;
    e.preventDefault();
    var name = form.name.value;
    var company = form.company.value;
    var experience = form.experience.value;
    var sendForm = {name : name,
                    company: company,
                    experience: experience}
    
    var val = validateDeveloper(sendForm);
    if(val){
      expanDivAdd();
      makePost(sendForm);
      form.reset();
    };
  };
  function editDeveloper(){
    refId= this.getAttribute('id')
    refId= refId.split('');
    refId= Number(refId[1]);
    var divEdit = document.getElementById('editDeveloper');
    $(divEdit).show(1000,"linear");
    var formul = document.forms.editDev;
    formul.setAttribute('id', refId);
    console.log(formul)
  }
  var formul = document.forms.editDev;
  formul.addEventListener('submit', prepareDataToPUT);
  function prepareDataToPUT(e){
    e.preventDefault();
    var divEdit = document.getElementById('editDeveloper');
    $(divEdit).hide(1000,"linear");
    var form = this;
    var name = form.name.value;
    var company = form.company.value;
    var experience = form.experience.value;
    var id = Number(this.getAttribute('id'));
    var sendForm = {name : name,
                    company: company,
                    experience: experience,
                    id: id}
    var val = validateDeveloper(sendForm);
    if(val){
      makePUT(sendForm);
      form.reset();
    };
  }

  function validateDeveloper(form){
    var name = form.name;
    var company = form.company;
    var experience = form.experience;
    experience = Number(experience);

    if(typeof name != 'string' || name.length < 2 || name.length > 35) {
      alert('algo va mal con el nombre');
      return false;
    }else{
      if(typeof company != 'string' || company.length < 2 || company.length > 25) {
        alert('algo va mal con la empresa');
        return false;
      }else{
        if(isNaN(experience)){
          alert('algo va mal con la experiencia');
          return false;
        }else{
          return true;
        };

      };
    };
  };
  var AZButton= document.getElementById('A-Z');
  AZButton.addEventListener('click', orderAZ);
  function orderAZ(){
    globalData.sort(sortNames);
    divDev= document.getElementById('main');
    $(divDev).empty();
    getDevelopers(globalData);
  };
  var ZAButton= document.getElementById('Z-A');
  ZAButton.addEventListener('click', orderZA);
  function orderZA(){
    globalData.sort(sortNames).reverse();
    divDev= document.getElementById('main');
    $(divDev).empty();
    getDevelopers(globalData);
  };
  function sortNames(a,b){
    var nameA=a.name.toLowerCase()
    var nameB=b.name.toLowerCase()
    if (nameA < nameB)
      return -1 
    if (nameA > nameB)
      return 1
    return 0;
  };
};
