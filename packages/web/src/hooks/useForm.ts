import { useEffect, useState } from 'react'

export const useForm = (
  initialState: Record<string, any>,
  dependencies: any[] = []
) => {
  const initialErrors: Record<string, string> = {}

  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState(initialErrors)
  useEffect(() => {
    setValues(initialState)
  }, dependencies)

  const handleChange = (event: any) => {
    const { type, checked, name, value } = event.target

    if (type && type === 'checkbox') {
      setValues({ ...values, [name]: checked })
    } else {
      setValues({ ...values, [name]: value })
    }
  }

  const validateField = (event: any) => {
    type Target = {
      type: string
      required: boolean
      value: any
      name: string
    }
    const { type, required, value, name }: Target = event.target

    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    if (required && !value) {
      setErrors({ ...errors, [name]: 'Please complete this field.' })
    } else if (type === 'email' && !regex.test(value.toLowerCase())) {
      setErrors({
        ...errors,
        [name]: 'Please use a valid email address.',
      })
    } else if (type === 'password' && value.length < 6) {
      setErrors({
        ...errors,
        [name]: 'Please use at least 6 characters in your password.',
      })
    } else if (name === 'summary' && value.length > 510) {
      setErrors({
        ...errors,
        [name]: 'The summary must be 510 characters or less.',
      })
    } else if (errors[name]) {
      setErrors({ ...errors, [name]: '' })
    }
  }

  const validate = () => {
    const existingErrors = Object.keys(errors).filter((key) => {
      return !!errors[key]
    })

    return !existingErrors.length
  }

  const reset = (resetErrors: boolean = true) => {
    setValues(initialState)
    if (resetErrors) setErrors(initialErrors)
  }

  return {
    values,
    setValues,
    validateField,
    errors,
    handleChange,
    validate,
    reset,
  }
}
