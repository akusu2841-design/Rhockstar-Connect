const form = document.getElementById("registerForm");


form.addEventListener("submit", function(e){

  e.preventDefault();

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;

  if(name.length < 3){
    alert("Please use a valid name.");
    return;
  }

  if(!passwordPattern.test(password)){
    alert(
      "Password must contain:\n\n" +
      "• At least 8 characters\n" +
      "• One uppercase letter\n" +
      "• One lowercase letter\n" +
      "• One number\n" +
      "• One special character"
    );
      window.location.href = "login.html";
  }

  alert("Registration successful!");

  form.reset();
});
