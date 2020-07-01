/*
         Made by YapacDev(Yassine El atlassi)
                    2020.07.01
 */

 
//Input validation

let input_city = document.getElementById("city");
input_city.addEventListener('input',function(params){

    let ValidationText = document.getElementById("validation-text");
    let Submit_button = document.getElementById("submit");

    if(Validation(params.target.value)==true)
    {
        Submit_button.removeAttribute("disabled");
        ValidationText.classList.replace("text-danger","text-success");
        ValidationText.textContent="Make sure that the names are well writed";
    }
    else
    {
        Submit_button.setAttribute("disabled","");
        ValidationText.classList.replace("text-success","text-danger");
        ValidationText.textContent="Do not enter numbers";

    }
})

let input_job =document.getElementById("job");
input_job.addEventListener('input',function(params){
    let ValidationText = document.getElementById("validation-text");
    let Submit_button = document.getElementById("submit");

    if(Validation(params.target.value)==true)
    {
        Submit_button.removeAttribute("disabled");
        ValidationText.classList.replace("text-danger","text-success");
        ValidationText.textContent="Make sure that the city names are well writed";
    }
    else
    {
        Submit_button.setAttribute("disabled","");
        ValidationText.classList.replace("text-success","text-danger");
        ValidationText.textContent="Do not enter numbers";

    }
})

function Validation(value) {
    return /^[a-zA-Z\s]+$/.test(value);
}

//Objects
class Job {
    constructor(title,city,date,link,summary)
    {
        this.title = title;
        this.city = city;
        this.date = date;
        this.link = link;
        this.summary = summary;
    }
}


//Ajax
function GetData(cityName,jobName) 
{
    var request = new XMLHttpRequest();
    let Jobs=[];
    request.onreadystatechange= function() {
        let body = document.getElementById("result");
        body.textContent="";
    if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        let result = JSON.parse(this.responseText);
        for (let index = 0; index < result.Title.length; index++) 
        {
            Jobs.push(new Job(result.Title[index],result.city[index],result.date[index],result.link[index],result.summary[index]));
        }
        //Card creation
        for (let index = 1; index < Jobs.length; index++) 
        {
            let picNumber = Math.floor(Math.random() * 3) + 1;
            $(body).append(' <div class="card my-3" style="width:400px"> <img class="card-img-top" src="p/job_'+picNumber+'.jpg" alt="Card image"> <div class="card-body"> <h4 class="card-title">' +
            Jobs[index].title +'</h4> <div class="card-text"> <ul> <li>'+Jobs[index].city+'.</li> <li>'+Jobs[index].date +'.</li> <li>'+Jobs[index].summary
            +'</div><a target="_blank" href="'+Jobs[index].link +'"class="btn btn-info">See the offer</a>');
        }

  
    }
    else
    {
        $(body).append('<span id="waiting" class="spinner-border spinner-border-xl"></span>');
    }
    }
    console.log(Jobs);  
    request.open("GET",'https://lkhedma.herokuapp.com/jobs/'+jobName+'/'+cityName);
    request.send();
}

//Button listening

let Submit_button = document.getElementById("submit");
Submit_button.addEventListener('click',function(params) 
{
    params.preventDefault();
    let city_name = document.getElementById("city").value;
    let job_name =document.getElementById("job").value;
    GetData(city_name,job_name);
})
