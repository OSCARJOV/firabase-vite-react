import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import CodeError from "../components/CodeError"
import { UserContext } from "../context/UserProvider"
import { erroresFirebase } from "../utils/erroresFirebase"

const Register = () => {

    // const [email, setEmail] = useState('prueba@prueba.com')
    // const [password, setPassword] = useState('123456')

    const navigate = useNavigate()

    const { registerUser } = useContext(UserContext)

    const { register, handleSubmit, getValues, setError, formState: { errors } } = useForm({

        defaultValues:{
            email: "prueba@prueba.com",
            password: "123123",
            repassword: "123123",
        }
    })



    const onSubmit = async ({ email, password }) => {  // accion del formulario
        try {
            await registerUser(email, password)
            console.log("exitoso");
            navigate("/login")
        } catch (error) {
            console.log(error.code);
            setError("email", {
                message: erroresFirebase(error.code),

            })
        }

        console.log("procesando", email, password);
    }
    // handlesubmit es el que procesa el formulario

    return (
        <>
            <h1>Register</h1>
                        
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="email"
                    placeholder="ingrese email"
                    {...register("email", {
                        required: {
                            value: true,
                            message: 'Campo Obligatorio'
                        },
                        pattern: {
                            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
                            message: "Formato de email incorrecto",
                        },
                    })}

                //  value={email}
                //  onChange={(e) => setEmail(e.target.value)}
                //  name={email}
                />
                {/* {errors.email && <p>{errors.email.message}</p>} */}
                  <CodeError error={errors.email}/>
                <input
                    type="password"
                    placeholder="ingrese password"
                    {...register("password", {
                     //   setValuesAs: (v) => v.trim(),  //esto boras los espacios en blanco
                        minLength: {    
                        value: 6,
                            message: "Minimo 6 caracteres"
                        },
                        validate: {   // validacion
                            trim: (v) => {
                                if (!v.trim()) {
                                    return "error, existen espacios en blanco";
                                }
                                return true;
                            }
                        }
                    })}
                //value={password}
                //onChange={(e) => setPassword(e.target.value)}
                //    name={password}
                />

                {/* {errors.password && errors.password.message} */}
                <CodeError error={errors.password}/>

                <input
                    type="password"
                    placeholder="ingrese password"
                    {...register("repassword", {
                     //   setValuesAs: (v) => v.trim(),
                        validate: {
                            equals: v => 
                            v === getValues("password") ||
                             "No coinciden las contraseñas",  // trae getValues del metodo useForms
                            //message: "No coinciden las contraseñas"
                        }
                    }
                    )}

                />

                {/* {errors.repassword && <p>{errors.repassword.message}</p>} */}
                <CodeError error={errors.repassword}/>

                <button type="submit">Register</button>

            </form>
        </>
    )
}

export default Register