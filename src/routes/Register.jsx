import { useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"

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



    const onSubmit = async ({ email, password }) => {
        try {
            await registerUser(email, password)
            console.log("exitoso");
            navigate("/login")
        } catch (error) {
            console.log(error.code);
            if (error.code === 'auth/email-already-in-use')
                //console.log("Ya esta registrado este correo");
                setError("email", {
                    message: "usuario ya existe"
                })

            if (error.code === 'auth/invalid-email')
            setError("email", {
                message: "Formato email no valido"
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

                {errors.email && <p>{errors.email.message}</p>}
                <input
                    type="password"
                    placeholder="ingrese password"
                    {...register("password", {
                        minLength: {
                            setValuesAs: (v) => v.trim(),  //esto boras los espacios en blanco
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

                {errors.password && errors.password.message}

                <input
                    type="password"
                    placeholder="ingrese password"
                    {...register("repassword", {
                        setValuesAs: (v) => v.trim(),
                        validate: {
                            equals: v => v === getValues("password") || "No coinciden las contraseñas",  // trae getValues del metodo useForms
                            //message: "No coinciden las contraseñas"
                        }
                    }
                    )}

                />

                {errors.repassword && <p>{errors.repassword.message}</p>}

                <button type="submit">Register</button>

            </form>
        </>
    )
}

export default Register