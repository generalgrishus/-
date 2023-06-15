send = function(){
    const requestUrl = 'http://127.0.0.1:8000/api/reg/';
    //const reqUrl = 'https://jsonplaceholder.typicode.com/posts'
    const userData = {  
      // username: "ppppppeepe",
      // email: "ppppppeepe@mail.ru",
      // password1: "Uhbif134",
      // password2: "Uhbif134"
    username: username.value,
    email: email.value,
    password1: password1.value,
    password2: password2.value
    // username: username.value,
    // password: email.value//"abcdefgfgfgffgff"
  };
  var cookie = Cookies.get('csrftoken');
  const config = {
      method: "POST",
      headers: new Headers({"content-type": "application/json"},{'X-CSRFToken': cookie}),
      credentials: 'include',
      body: JSON.stringify(userData)
  };
  
  const request = fetch(requestUrl, config
  )
  .then(response => response.json())
  .then(function (response) {
    const returnData = (response);
    jsonData = JSON.parse(returnData);
    receivedErrors = jsonData.errors;
    console.log(receivedErrors)
    if (receivedErrors != null){
      console.log('here is not null');
      const container = document.getElementById('password2');
      const answer = document.createElement('p');
      if (receivedErrors.username){
        answer.innerText = `${receivedErrors.username[0]}`
        container.appendChild(answer);
      }
      if (receivedErrors.email){
        answer.innerText = `${receivedErrors.email[0]}`
        container.appendChild(answer);
      }
      if (receivedErrors.password1){
        answer.innerText = `${receivedErrors.password1[0]}`
        container.appendChild(answer);
      }
      if (receivedErrors.password2){
        answer.innerText = `${receivedErrors.password2[0]}`
        container.appendChild(answer);
      }
      
      //asdsasa@mail.ru
    }
    else{
      console.log("here is null");
      if (jsonData.success == true)
      {
        window.location.href = 'index.html'
      }  
    }
    })
  }
