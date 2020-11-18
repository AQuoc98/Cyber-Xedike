import React from 'react';
import "./footer.css";

export default function footer() {
  return (
    <section className="footer py-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 col-sm-6 col-12">
            <ul className="footer__list">
              <li>
                <i className="fa fa-phone icon"></i> <strong>Hỗ trợ hành khách: </strong> <span>090x.xx.xx.xx</span>
              </li>
              <li>
                <i className="fa fa-phone icon"></i> <strong>Hỗ trợ tài xế: </strong> <span>090x.xx.xx.xx</span>
              </li>
              <li>
                <i className="fa fa-envelope icon"></i> <strong>Email: </strong> <span>xedike@gmail.com</span>
              </li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6 col-12">
            <ul className="footer__list">
              <h5>Thông tin</h5>
              <li>
                <a href="/">Liên hệ</a>
              </li>
              <li>
                <a href="/">Đội ngũ</a>
              </li>
              <li>
                <a href="/">Tuyển dụng</a>
              </li>
              <li>
                <a href="/">Những câu hỏi thường gặp</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6 col-12">
            <ul className="footer__list">
              <h5>Xe đi ké</h5>
              <li>
                <a href="/">Điều khoản sử dụng</a>
              </li>
              <li>
                <a href="/">Chính sách Bảo mật thông tin</a>
              </li>
              <li>
                <a href="/">Quy chế sàn giao dịch</a>
              </li>
              <li>
                <a href="/">Cơ chế giải quyết tranh chấp</a>
              </li>
            </ul>
          </div>
          <div className="col-md-3 col-sm-6 col-12">
            <ul className="footer__list">
              <h5>Hỗ trợ</h5>
              <li>
                <a href="/">Đăng kí làm tài xế</a>
              </li>
              <li>
                <a href="/">Đăng ký hành khách</a>
              </li>
              <li>
                <a href="/">Hành lí thất lạc</a>
              </li>
              <li>
                <a href="/">Điều kiện hủy</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
