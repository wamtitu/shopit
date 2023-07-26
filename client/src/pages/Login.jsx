import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import '../styles/login.css'
import {useDispatch} from 'react-redux'
import { loginUser } from '../redux/apiCalls'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const schema = yup.object({
    email: yup.string().required('email is required'),
    password: yup.string().required('password is required'),
})

function Login() {
    const user = useSelector((state)=>state.user?.currentUser?.token)

    const dispatch = useDispatch();
    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate();
   useEffect(()=>{
    if  (user){
    
      navigate('/');
    
    }else{
      navigate('/login')
     }
   }, [user]);
    const onsubmit= async (data)=>{
        loginUser(dispatch, data)
      
    }
    
  return (
    <div>
    <div className="form-container-login">
    <div className='left'>
        <div className="header"><h1>welcome to shopIt</h1></div>
        <img src="/images/SHOPIT.png" alt="logo" />
        <div className="desc"> <h3>login to shop at shopit ,<br/> get designer shoes and rare brands</h3></div>
        </div>
        <form className='login' onSubmit={handleSubmit(onsubmit)}>
            <h6>enter email and password to login</h6>
            <input placeholder="email" {...register('email')}/>
            {errors.email && <p>{errors.email.message}</p>}
            <input placeholder="password" {...register('password')}/>
            {errors.password && <p>{errors.password.message}</p>}
            <input type="submit"/>
        </form>
    </div>
    </div>
  )
}

export default Login