document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    const dobInput = document.getElementById("dob");
    const submitBtn = document.getElementById("submitBtn");

    // Validation Functions
    function validateName() {
        const name = nameInput.value.trim();
        const regex = /^[A-Za-z\s]{3,}$/;
        if (regex.test(name)) {
            setValid(nameInput);
            return true;
        } else {
            setInvalid(nameInput, "Name must be at least 3 characters and contain only letters and spaces.");
            return false;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regex.test(email)) {
            setValid(emailInput);
            return true;
        } else {
            setInvalid(emailInput, "Please enter a valid email address.");
            return false;
        }
    }

    function validatePassword() {
        const password = passwordInput.value.trim();
        const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (regex.test(password)) {
            setValid(passwordInput);
            return true;
        } else {
            setInvalid(passwordInput, "Password must be at least 8 characters long and contain both letters and numbers.");
            return false;
        }
    }

    function validateConfirmPassword() {
        const confirmPassword = confirmPasswordInput.value.trim();
        if (confirmPassword === passwordInput.value.trim()) {
            setValid(confirmPasswordInput);
            return true;
        } else {
            setInvalid(confirmPasswordInput, "Passwords do not match.");
            return false;
        }
    }

    function validateDOB() {
        const dob = dobInput.value.trim();
        const regex = /^\d{4}-\d{2}-\d{2}$/;

        if (!regex.test(dob)) {
            setInvalid(dobInput, "Date must be in YYYY-MM-DD format.");
            return false;
        }

        const dobDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }

        if (age >= 18) {
            setValid(dobInput);
            submitBtn.disabled = false;
            return true;
        } else {
            setInvalid(dobInput, "You must be at least 18 years old.");
            submitBtn.disabled = true;
            return false;
        }
    }

    // Helper Functions to Set Validation States
    function setValid(element) {
        element.classList.add("valid");
        element.classList.remove("invalid");
        element.nextElementSibling.textContent = '✔';
        element.nextElementSibling.style.color = "green";
        element.nextElementSibling.style.display = "inline";
    }

    function setInvalid(element, message) {
        element.classList.add("invalid");
        element.classList.remove("valid");
        element.nextElementSibling.textContent = message;
        element.nextElementSibling.style.color = "red";
        element.nextElementSibling.style.display = "inline";
    }

    // Attach Event Listeners for Real-Time Validation
    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    passwordInput.addEventListener("input", validatePassword);
    confirmPasswordInput.addEventListener("input", validateConfirmPassword);
    dobInput.addEventListener("input", validateDOB);

    // Event Listener for Form Submission
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent form from submitting if validation fails

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isDOBValid = validateDOB();

        if (isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isDOBValid) {
            alert("Registration successful!");
            form.submit(); // Submit the form if all fields are valid
        } else {
            alert("Please correct the errors in the form.");
        }
    });
});
