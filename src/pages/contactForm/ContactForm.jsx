import emailjs from "emailjs-com";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "../../component/footer/Footer";
import Navbar from "../../component/navbar/Navbar";
import "./ContactForm"

export default function ContactForm() {
    
    function sendEmail(e) {
        e.preventDefault();

    emailjs.sendForm("Ons","template_9lo8fni", e.target, 'moIyS_YJl2Dd7uYpQ')
        .then((result) => {
            console.log(result.text);
            alert("thank you! we will be in touch soon");
            
        }, (error) => {
            alert("your message didn't send try it later");
            console.log(error.text);
        });
        e.target.reset()
    }

    return(
        <div>
            <Navbar />
            <div className="container">
            <form onSubmit={sendEmail} >
                    <div className="row pt-5 mx-auto">
                        <div className="col-8 form-group mx-auto">
                            <input type="text" className="form-control" placeholder="Name" name="name"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="email" className="form-control" placeholder="Email Address" name="email"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="text" className="form-control" placeholder="Subject" name="subject"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <textarea className="form-control" id="" cols="30" rows="8" placeholder="Your message" name="message"></textarea>
                        </div>
                        <div className="col-8 pt-3 mx-auto">
                            <input type="submit" className="btn btn-info" value="Send Message" >
                            </input>
                        </div>
                    </div>
                </form>
            </div>
            <Footer/>
        </div>
    )
}