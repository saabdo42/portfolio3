class box {
    constructor(description){
        this.description = description;

        this.reveal = function reveal() { 
            //reveals the description
            this.description.classList.replace("invis", "vis");
        }

        this.hide = function hide() {
            //hides the description
            this.description.classList.replace("vis", "invis");
        }

        this.isvisible = function isvisible() {
            //checks if a description is visible
            if (this.description.classList.contains("vis") == true) {
                return true;
            }else{
                return false;
            }
        }
    } 
}