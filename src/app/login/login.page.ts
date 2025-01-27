import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

const firebaseConfig = {};

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  showLogin = false;
  // constructor(private auth: Auth) {}
  app = initializeApp(firebaseConfig);

  constructor(private router: Router) {}

  ngOnInit() {}

  registerHandler(f) {
    createUserWithEmailAndPassword(
      getAuth(this.app),
      f.value.email,
      f.value.password
    )
      .then((userCredential) => {
        // Signed up
        console.log(userCredential);
        this.showLogin = true;
        f.reset();
        // ...
      })
      .catch((error) => {
        console.log(error);
        // ..
      });
  }

  toggleShowLoginBtn() {
    this.showLogin = !this.showLogin;
  }

  LoginHandler(f) {
    signInWithEmailAndPassword(
      getAuth(this.app),
      f.value.email,
      f.value.password
    )
      .then((userCredential) => {
        // Signed in
        console.log(userCredential);
        this.router.navigateByUrl('/home');

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
}
