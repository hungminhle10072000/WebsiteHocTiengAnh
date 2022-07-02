import './UserComponent.css'

function Footer() {
    return(
        <div className="footer-cus">
            <div></div>
            <div className='footer--item'>
                <label className='list-item footer--title'>Footer Content</label>
                <label className='list-item'>Footer Content</label>
                <label className='list-item'>Footer Content</label>
            </div>
            <div className='footer--item'>
                <label className='list-item footer--title'>Link</label>
                <label className='list-item'>Link</label>
                <label className='list-item'>Link</label>
                <label className='list-item'>Link</label>
            </div>
            <div className='footer--item'>
                <label className='list-item footer--title'>Thông tin liên hệ</label>
                <label className='list-item'>Facebook</label>
                <label className='list-item'>Messenger</label>
                <label className='list-item'>Số điện thoại: </label>
            </div>
            <div></div>

        </div>
    );
}
export default Footer;