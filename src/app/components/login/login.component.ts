import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string

  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
     private authService:AuthService, private toastrService:ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = this.formBuilder.group({
      email: ["",Validators.required],
      password:["",Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      let loginModel = Object.assign({},this.loginForm.value)

      this.authService.login(loginModel).subscribe(response=>{
        console.log(response)
        localStorage.setItem("token",response.token)
        this.toastrService.success("Giriş yaptınız","Başarılı")
        localStorage.setItem("kullaniciAdi",this.email)
        console.log(this.email)
        this.router.navigate(['cars'])

      },responseError=>{
        this.toastrService.error(responseError.error)
      })
    }
  }
}
