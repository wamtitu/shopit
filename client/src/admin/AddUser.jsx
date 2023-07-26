import {useForm} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import axios from 'axios'
// import { useNavigate } from 'react-router-dom'

const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().required(),
    phone: yup.string().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required(),
})
function Signup() {
    const navigate = useNavigate()

    const {register, handleSubmit, formState:{errors}} = useForm({
        resolver: yupResolver(schema)
    });

    const onsubmit= async (data)=>{
        // event.preventDefault();
        try {
             await axios.post('http://localhost:5000/auth/register', data)
             navigate('/login')
        } catch (error) {
            console.log(error, ':user already exists')
        }
    }
  return (
    <div className="form-container-register">
        <div className='left'>
        <div className="header"><h1>welcome to shopIt</h1></div>
        <img src="/images/SHOPIT.png" alt="logo" />
        <div className="desc"> <h3>register to shop at shopit ,<br/> get designer shoes and rare brands</h3></div>
        </div>
        <form className='register' onSubmit={handleSubmit(onsubmit)}>
            <h6>fill the form to register</h6>
            <input placeholder="name" {...register('name')} />
            {errors.name && <p>{errors.name.message}</p>}
            <input placeholder="email" {...register('email')}/>
            {errors.email && <p>{errors.email.message}</p>}
            <input placeholder="phone" {...register('phone')}/>
            {errors.phone && <p>{errors.phone.message}</p>}
            <input placeholder="password" {...register('password')}/>
            {errors.password && <p>{errors.password.message}</p>}
            <input placeholder="confirmPassword" {...register('confirmPassword')}/>
            {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
            <input type="submit"/>
        </form>
    </div>
  )
}

export default Signup
