import { useState } from 'react'

export const useCheckbox = (config) => {
  function updateRefs (config, oldCB) {
    config = { ...config, isSelected: config.isAllSelected() }
    if (config.ref) {
      const options = [...config.ref.options]
      options[config.ref.options.findIndex(option => option === oldCB)] = createCheckbox(config, config.ref)
      const updatedConfig = { ...config.ref, options }
      return updateRefs(updatedConfig, config.ref)
    }
    return createCheckbox(config, undefined)
  }

  function setCheckbox (config) {
    config.isAllSelected ? setState(updateRefs(config, this)) : setState(createCheckbox(config, undefined))
  }

  function setOptions (options) {
    this.setCheckbox({ ...this, options })
  }

  function addOption (option) {
    this.setOptions([...this.options, option])
  }

  function setIsSelected (isSelected) {
    function selectOne (cb, isSelected) {
      const options = cb.options.map(option => { return { ...selectOne(option, isSelected), isSelected } })
      return { ...cb, options, isSelected }
    }

    const options = this.options.map(option => { return selectOne(option, isSelected) })
    this.setCheckbox({ ...this, options, isSelected })
  }

  function setProperties (properties) {
    this.setCheckbox({ ...this, properties })
  }

  function setName (name) {
    this.setCheckbox({ ...this, name })
  }

  function getSelectedOptions () {
    return this.options.filter(option => option.isSelected)
  }

  function isIndeterminate () {
    if (this.isAllSelected()) { return false }
    return this.options.some(item => item.isSelected)
  }

  function isAllSelected () {
    if (this.options.length) { return !this.options.filter(option => !option.isSelected).length }
    return this.isSelected
  }

  function isAnySelected () {
    return this.isIndeterminate() || this.isAllSelected()
  }

  function removeOption () {
    const options = this.ref?.options.filter(option => option !== this)
    if (this.ref) { this.ref.setCheckbox({ ...this.ref, options }) }
  }

  function select () {
    if (this.isIndeterminate()) { this.setIsSelected(true) } else { this.setIsSelected(!this.isSelected) }
  }

  function createCheckbox (config, ref) {
    const cb = {
      getSelectedOptions,
      isIndeterminate,
      isAllSelected,
      isAnySelected,
      setIsSelected,
      setProperties,
      removeOption,
      setCheckbox,
      setOptions,
      addOption,
      setName,
      select,
      isSelected: config.isSelected ?? false,
      properties: config.properties,
      name: config.name,
      options: [],
      ref
    }

    config.options?.forEach(option => cb.options.push(createCheckbox(option, cb)))
    return cb
  }

  const [state, setState] = useState(createCheckbox(config, undefined))
  return [state, setState]
}
