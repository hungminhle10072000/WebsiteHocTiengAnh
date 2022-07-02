import './UserComponent.css'
import {FaFacebookSquare} from  "react-icons/fa";
import {BsMessenger,BsFillTelephoneFill} from  "react-icons/bs";
import {MdEmail} from 'react-icons/md';

function Footer() {
    return(
        <div className="footer-cus">
            <div></div>
            <div className='footer--item footer--item--larger'>
                <label className='list-item footer--title'>Thông tin website:</label>
                <label className='list-item'>Học IELTS, TOEIC, tiếng anh giao tiếp miễn phí</label>
                <label className='list-item'>Địa chỉ: Linh Trung - Thủ Đức - Tp.HCM</label>
                <label className='list-item'>Nếu bạn thích những video của mình, có thể Donate mời mình 1 ly cafe tại đây nhé: 0869122458 - Bùi Văn Nghĩa</label>
            </div>

            <div className='footer--item'>
                <label className='list-item footer--title'>Kết nối với chúng tôi:</label>
                <label className='list-item'>
                    <a className='footer--item-link' href="https://www.facebook.com/VawnCem/" >
                        <FaFacebookSquare style={{marginRight:'5px', marginBottom: '5px'}}>
                        </FaFacebookSquare>Facebook
                    </a>
                </label>

                <label className='list-item'>
                    <a className='footer--item-link' href="https://www.messenger.com/t/100007165026874">
                        <BsMessenger></BsMessenger> Messenger
                    </a>
                </label>
                <label className='list-item '><BsFillTelephoneFill></BsFillTelephoneFill> 0869122458 </label>
                <label className='list-item'><MdEmail/> Email: nghb@gmail.com </label>
            </div>
            <div></div>

        </div>
    );
}
export default Footer;