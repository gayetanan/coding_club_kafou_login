

class ValidData {
    constructor(){
        this.canSubmit = false;
        this.validPassword = false;
        this.validEmail = false;
    }
    #watcher(){
        if(!this.validEmail || !this.validPassword){
            this.canSubmit = false;
        }else{
            this.canSubmit = true;
        }
        this.#button()
    }
    #button(){
        const button = document.querySelector("#b")
        if(this.canSubmit){
            button.removeAttribute("disabled");
            return
        }
        button.setAttribute("disabled","true");
    }
    toggleEmail(e){
        const fieldvalue = e.target.value;
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        // if field exists or if it follow email format.
        if(!fieldvalue || !regex.test(fieldvalue)){
            this.validEmail = false;
        }else{
            this.validEmail = true;
        }
        this.#watcher();
    }
    togglePassword(e){
        const fieldvalue = e.target.value;
        if(fieldvalue.trim() === ""){
            this.validPassword = false;
        }else{
            this.validPassword = true;
        }
        this.#watcher();
    }
}
const log = new ValidData()
const email = document.querySelector("#email")
const password = document.querySelector("#password")
email.addEventListener("input",(e)=> log.toggleEmail(e))
password.addEventListener("input",(e)=> log.togglePassword(e))

document.querySelector("#show").addEventListener("click",(e)=>{
    const toggler = e.target;
    const inputType = password.getAttribute("type");
    if(inputType==="password"){
        password.type = "text"
        toggler.classList.remove("bxs-show")
        toggler.classList.add("bxs-hide")
    }else{
        password.type = "password";
        toggler.classList.remove("bxs-hide")
        toggler.classList.add("bxs-show")
    }
})

function getUserFromDb({email,password}){
    const datas = localStorage.getItem("users");
    if(!datas){
        throw new Error('invalid credentails')
    }

    const users = JSON.parse(datas);
    if(users.length === 0){
        throw new Error('invalid credentails')
    }

    const isExistUser = users.find((user)=>{
        return user.email == email && user.password === password
    })

    if(!isExistUser){
        throw new Error('invalid credentails')
    };
    delete isExistUser.password
    localStorage.setItem("currentUser",JSON.stringify({...isExistUser}))
    window.location.href ="/"
}

document.querySelector("#form").addEventListener("submit",(e)=>{
  try {
    e.preventDefault();
    const password = e.target.password.value;
    const email = e.target.email.value;
    getUserFromDb({password,email})
  } catch (error) {
    if(!document.querySelector("#message-ctn span")){
        document.querySelector("#message-ctn").innerHTML =`<span>${error.message}</span>`
        setTimeout(()=>{
            document.querySelector("#message-ctn").innerHTML =``
        },6000)
    }
  }

})

// localStorage.setItem("users",JSON.stringify([
//     {username:"Gaetan",email:"gaetan@email.com",password:"1234"},
//     {username:"appo",email:"appo@email.com",password:"1234"},
// ]))