import styles from './Input.module.scss'

interface Props {
  className?: string
  type?: string
  placeholder?: string
  name?: string
  id?: string
  label?: string
  value?: string | number | boolean
  required?: boolean
  onChange?: Function
  onFocus?: Function
  onBlur?: Function
  children?: any
  step?: number
  min?: number
  max?: number
  disabled?: boolean
  options?: { value: any; text: string }[]
  validation?: string
  formState?: { [key: string]: any }
}

const Input: React.FC<Props> = (props) => {
  // Instantiate props with defaults
  let {
    className = '',
    type = 'text',
    placeholder = '',
    name = '',
    id = name,
    label = '',
    value = '',
    required = false,
    onChange = () => null,
    onFocus = () => null,
    onBlur = () => null,
    step,
    min,
    max,
    disabled,
    children = null,
    options = [],
    validation = '',
    formState,
  } = props

  // Set formstate vars, but don't overwrite if passed explicitely
  if (formState) {
    if (!value) value = formState.values[name]
    if (!validation) validation = formState.errors[name]
    if (!onChange()) onChange = formState.handleChange
    if (!onBlur()) onBlur = formState.validateField
  }

  // Render label if present
  const renderLabel = () => {
    if (!label) return null

    return (
      <label className={styles.label} htmlFor={id}>
        {label}
        {required && ' *'}
      </label>
    )
  }

  // Render the input
  const renderInput = () => {
    if (type === 'textarea') {
      return (
        <>
          {renderLabel()}
          <textarea
            disabled={!!disabled}
            placeholder={placeholder}
            name={name}
            id={id}
            className={`${styles.textarea} ${
              validation && styles.invalid
            }`}
            value={value?.toString() || ''}
            required={!!required}
            onChange={(event) => onChange(event)}
            onBlur={(event) => onBlur(event)}
            onFocus={(event) => onFocus(event)}
          />
        </>
      )
    } else if (type === 'checkbox') {
      return (
        <div className={styles.checkboxContainer}>
          <input
            disabled={!!disabled}
            type={type}
            placeholder={placeholder}
            name={name}
            id={id}
            className={styles.checkbox}
            checked={!!value}
            required={!!required}
            onChange={(event) => onChange(event)}
            onBlur={(event) => onBlur(event)}
            onFocus={(event) => onFocus(event)}
          />
          {renderLabel()}
        </div>
      )
    } else if (type === 'select') {
      return (
        <>
          {renderLabel()}
          <select
            disabled={!!disabled}
            name={name}
            id={id}
            className={`${styles.field} ${
              validation && styles.invalid
            }`}
            value={value?.toString() || ''}
            required={!!required}
            onChange={(event) => onChange(event)}
            onBlur={(event) => onBlur(event)}
            onFocus={(event) => onFocus(event)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
        </>
      )
    }

    return (
      <>
        {renderLabel()}
        <input
          disabled={!!disabled}
          type={type}
          placeholder={placeholder}
          name={name}
          id={id}
          className={`${styles.field} ${
            validation && styles.invalid
          }`}
          value={value?.toString() || ''}
          required={!!required}
          onChange={(event) => onChange(event)}
          onBlur={(event) => onBlur(event)}
          onFocus={(event) => onFocus(event)}
          step={step}
          min={min}
          max={max}
        />
      </>
    )
  }

  return (
    <div className={`${styles.input} ${className}`}>
      {renderInput()}
      <span className={styles.validation}>{validation}</span>
      {children}
    </div>
  )
}

export default Input
