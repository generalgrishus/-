send = function(){
    const requestUrl = 'http://127.0.0.1:8000/api/auth/';
    const userData = {  
    username: username.value,
    password: password.value,
  }
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
    console.log(receivedErrors);
    if (receivedErrors != null){
      const container = document.getElementById('container');
      const answer = document.createElement('p');
      if (receivedErrors.__all__){
        answer.innerText = `${receivedErrors.__all__[0]}`
        container.appendChild(answer);
      }
      if (receivedErrors.username){
        answer.innerText = `${receivedErrors.username[0]}`
        container.appendChild(answer);
      }
      if (receivedErrors.password){
        answer.innerText = `${receivedErrors.password[0]}`
        container.appendChild(answer);
      }
    }
    else if (jsonData.success == true){
      window.location.href = 'index.html';
    }
    })
  }