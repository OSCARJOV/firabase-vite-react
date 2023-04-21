

const CodeError = ({error}) => {
  
    return <>{error && <p>{error.message}</p>}</>
   
}

export default CodeError