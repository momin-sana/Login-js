document.addEventListener('DOMContentLoaded', function() {
    var signupBtn = document.querySelector("#signup-btn");
    var formContainer = document.querySelector("#form-container");
    var formTitle = document.querySelector("#form-title");
    var errorModel = document.getElementById("errorModel");
    var errorMessage = document.getElementById("error-message");
    var successModel = document.getElementById("successModel");
    var successMessage = document.getElementById("success-message");
    var closeSuccessButton = successModel.querySelector(".close");

    var joinAcademy = document.querySelector("#join-academy")
    var cta = document.querySelector(".cta");
    var check = 0;

    // Function to validate email format
    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    // Function to validate password format
    function validatePassword(password) {
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,10}$/;
        return re.test(password);
    }


    // Function to toggle login form visibility and update button icon
    function showLogin() {
    var text = cta.nextElementSibling;
    var loginText = cta.parentElement;
    text.classList.toggle('show-hide');
    loginText.classList.toggle('expand');
    if (check === 0) {
        cta.innerHTML = "<i class=\"fas fa-chevron-up\"></i>";
        check++;
    } else {
        cta.innerHTML = "<i class=\"fas fa-chevron-down\"></i>";
        check = 0;
    }
    }

    function displayErrorModel(message) {
        errorMessage.textContent = message;
        errorModel.style.display = "block";
        errorModel.classList.add("animated", "shake"); // Add shake class for animation
        setTimeout(function() {
          errorModel.style.display = "none";
          errorModel.classList.remove("animated", "shake"); // Remove animation class
        }, 5000); // 5 seconds
      }
      
      // Function to display success modal with bounceInDown animation
      function displaySuccessModel(message) {
        successMessage.textContent = message;
        successModel.style.display = "block";
        successModel.classList.add("animated", "bounceInDown"); // Add bounceInDown class for animation
        if (closeSuccessButton) {
            closeSuccessButton.addEventListener("click", function() {
              successModel.style.display = "none";
              successModel.classList.remove("animated", "bounceInDown"); // Remove animation class
            });
          }
        setTimeout(function() {
          successModel.style.display = "none";
          successModel.classList.remove("animated", "bounceInDown"); // Remove animation class
        }, 5000); // 5 seconds
      }

    // function to add shaking effect
    function shakeScreen() {
        document.body.classList.add('shake-screen');
        setTimeout(function() {
            document.body.classList.remove('shake-screen');
        }, 500); //0.5s
    }

    // Close Model when clicking on close button (×)
    var closeBtn = document.querySelector(".close");
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            errorModel.style.display = "none";
            successModel.style.display = "none";
        });
    }

    // Close Model when clicking outside of it
    window.addEventListener('click', function(event) {
        if (event.target === errorModel || event.target === successModel) {
            errorModel.style.display = "none";
            successModel.style.display = "none";        }
    });

    // Event listener for both cta and join academy button
    cta.addEventListener('click', showLogin);
    joinAcademy.addEventListener('click', showLogin);

// signup action in login
    signupBtn.addEventListener('click', function() {
        if (formTitle.textContent === 'Login') {
            formTitle.textContent = 'Sign Up';
            formContainer.innerHTML = `
                <h1 id="form-title" class="form-title">Sign Up</h1>
                <hr>
                <br>
                <div class="input-container">
                    <input type="email" id="email" required>
                    <label for="email">Email</label>
                    <span class="underline"></span>
                </div>
                <br>
                <div class="input-container">
                    <input type="password" id="create-password" required>
                    <label for="create-password">Create Password</label>
                    <span class="underline"></span>
                </div>
                <br>
                <div class="input-container">
                    <input type="password" id="confirm-password" required>
                    <label for="confirm-password">Confirm Password</label>
                    <span class="underline"></span>
                </div>
                <button class="login-btn" id="login-btn" type="button">Log In</button>
                <button class="signup-btn" id="signup-btn" type="submit">Sign Up</button>

            `;

            // login action in signup form
            var loginBtn = document.querySelector("#login-btn");
            loginBtn.addEventListener('click', function() {
                window.location.reload(); // Reload page to switch back to login form
            });

            //signup action in signup form
            var signupSubmitBtn = document.querySelector("#signup-btn");
            signupSubmitBtn.addEventListener('click', function() {
            
                var emailInput = document.querySelector("#email");
                var passwordInput = document.querySelector("#create-password");
                var confirmPasswordInput = document.querySelector("#confirm-password");

                var email = emailInput.value.trim();
                var password = passwordInput.value.trim();
                var confirmPassword = confirmPasswordInput.value.trim();

                console.log("Signup button clicked.");

                if (email === "" || password === "" || confirmPassword === "") {
                    console.error("Fields empty");
                    displayErrorModel("Fields cannot be empty.");
                    return;
                }

                if (!validateEmail(email)) {
                    console.error("Invalid email format.");
                    displayErrorModel("Please enter a valid email address.");
                    return;
                }

                if (!validatePassword(password)) {
                    console.error("Invalid password format.");
                    displayErrorModel("Password must be 8-10 characters long, with at least one special character, one number, and no spaces.");
                    return;
                }

                if (password !== confirmPassword) {
                    console.error("Passwords do not match.");
                    displayErrorModel("Passwords do not match.");
                    return;
                }

                console.log("Signup data validated. Email:", email);

                // Mock API or local storage save (for demonstration)
                var userData = {
                    email: email,
                    password: password
                };

                localStorage.setItem('userData', JSON.stringify(userData));
                console.log("Signup data saved to localStorage:", userData);
                displaySuccessModel("Signup successful! You can now log in.");
                window.location.reload(); // Reload page to switch to login form
            });
        }
    });

    //login action in login form
    var loginBtn = document.querySelector("#login-btn");
    loginBtn.addEventListener('click', function() {
        var emailInput = document.querySelector("#email");
        var passwordInput = document.querySelector("#password");

        var email = emailInput.value.trim();
        var password = passwordInput.value.trim();

        console.log("Login button clicked.");

        // Mock API or local storage fetch (for demonstration)
        var storedUserData = JSON.parse(localStorage.getItem('userData'));

        if (email === "" || password === "") {
            console.error("Fields empty");
            displayErrorModel("Fields cannot be empty.");
            return;
        }

        if (!storedUserData) {
            console.error("No user data found.");
            
            displayErrorModel("No user data found. Please sign up first.");
            return;
        }

        if (email !== storedUserData.email || password !== storedUserData.password) {
            console.error("Incorrect email or password.");
            shakeScreen();
            displayErrorModel("Incorrect email or password.");
            return;
        }

        console.log("Login successful for email:", email);
        displaySuccessModel("Login successful!");
        email.value = "";
        password.value = "";
        emailInput.value = "";
        passwordInput.value = "";
        // Redirect or perform further actions after successful login
    });

});
