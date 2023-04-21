



export const erroresFirebase = (code) => {
        
    if (code === 'auth/email-already-in-use'){
        console.log("Ya esta registrado este correo");
        return "usuario ya existe"}
                              
    if (code === 'auth/invalid-email'){
        return "Formato email  No valido"}

else{
    return "ocurrio un error en el server"
}
}

