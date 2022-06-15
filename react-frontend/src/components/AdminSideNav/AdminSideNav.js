import React from 'react'
import * as FaIcons from 'react-icons/fa'
import {MdOndemandVideo} from 'react-icons/md'
import {GoBook} from 'react-icons/go'
import {FaAdversal} from 'react-icons/fa'
import {FaUserEdit} from 'react-icons/fa'
import {GiPrayer} from 'react-icons/gi'
import {AiOutlineHome} from 'react-icons/ai'

export const AdminSideNav = [
  {
    title: 'Trang người dùng',
    path: '/user/home',
    icon: <AiOutlineHome />,
    cName: 'nav-text'
  },
  {
    title: 'Quản lí tài khoản',
    path: '/admin/account',
    icon: <FaIcons.FaUserFriends />,
    cName: 'nav-text'
  },
  {
    title: 'Quản lí từ vựng',
    path: '/admin/topic-vocabulary',
    icon: <FaAdversal/>,
    cName: 'nav-text'
  },
  {
    title: 'Quản lí ngữ pháp',
    path: '/admin/grammar',
    icon: <GoBook />,
    cName: 'nav-text'
  },
  {
    title: 'Quản lí khoá học',
    path: '/admin/course',
    icon: <MdOndemandVideo/>,
    cName: 'nav-text'
  },
  {
    title: 'Quản lí chương học',
    path: `/admin/chapter/${-1}`,
    icon: <MdOndemandVideo/>,
    cName: 'nav-text'
  },
  {
    title: 'Quản lí bài học',
    path: `/admin/lesson/${-1}`,
    icon: <MdOndemandVideo/>,
    cName: 'nav-text'
  },
  {
    title: 'Quản lí bình luận',
    path: '/admin/comments',
    icon: <FaUserEdit />,
    cName: 'nav-text'
  },
  {
    title: 'Quản lí bài tập',
    path: '/admin/exercise',
    icon: <GiPrayer />,
    cName: 'nav-text'
  },
  {
    title: 'Thay đổi thông tin',
    path: '/admin/edit/info',
    icon: <FaUserEdit />,
    cName: 'nav-text'
  },
  {
    title: 'Đăng xuất',
    path: '/',
    icon: <FaIcons.FaSignOutAlt/>,
    cName: 'nav-text'
  }
];






