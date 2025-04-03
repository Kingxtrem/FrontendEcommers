import React,{useState} from 'react'

const Register = () => {
    const [Data, setData] = useState({
        userName: "",
        email: "",
        password: ""
    })
    const onchangeHandler = (e) => {
        setData({ ...Data, [e.target.name]: e.target.value })
    }
    const onsubmitHandler = (e) => {
        e.preventDefault()
        console.log(Data)
        setData({
            userName: "",
            email: "",
            password: ""
        })
    }
    return (
        <div className='bg-slate-700 text-white min-h-screen flex conainer'>
            <div className='w-fit h-fit flex flex-col justify-items-center bg-white text-black mx-auto m-5 border-0 rounded-2xl items-center p-3'>
                <div className='text-3xl text-green-700 font-bold underline'>Register Here</div>
                <form action="" onSubmit={onsubmitHandler}>
                    <div className='container p-3 flex flex-col items-center gap-4'>
                        <label htmlFor="userName" className="w-80">User Name: <input type="text" placeholder='Enter your user name here' className='w-80 border-2 rounded-lg p-2' name='userName' value={Data.userName} onChange={onchangeHandler} autoComplete='current-userName' /></label>
                        <label htmlFor="email" className="w-80">Email: <input type="email" placeholder='Enter your email here' className='w-80 border-2 rounded-lg p-2' name='email' value={Data.email} onChange={onchangeHandler} autoComplete="current-email" /></label>
                        <label htmlFor="password" className="w-80">Password: <input type="password" placeholder='Enter your password here' className='w-80 border-2 rounded-lg p-2' name='password' value={Data.password} onChange={onchangeHandler} autoComplete="current-password" /></label>
                        <input type="submit" className='border-2 bg-blue-700 rounded-3xl hover:bg-blue-900 active:bg-red-800 text-2xl w-fit box-border text-white border-black px-5 py-2.5 cursor-pointer' value="Register" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
