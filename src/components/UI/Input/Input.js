import classes from './Input.module.css'

const Input = ({type, id, value, onChange, onBlur, label, isValid})=>{
    return (
      
         <div
          className={`${classes.control} ${
            isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">{label}</label>
          <input
            type={type} id={id} value={value} onChange={onChange} onBlur={onBlur}
          />
        </div>
    )
}

export default Input;