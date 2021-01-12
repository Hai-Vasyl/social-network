import React from "react"
import { IField } from "../interfaces"
import FieldFile from "./FieldFile"
import Field from "./Field"
import FieldPicker from "./FieldPicker"

interface IModFormProps {
  handleChangeFieldFile(event: React.ChangeEvent<HTMLInputElement>): any
  handlePickOption(value: string): any
  form: IField[]
  options: { value: string; label: string }[]
  handleChageField(event: React.ChangeEvent<HTMLInputElement>): any
}

const ModForm: React.FC<IModFormProps> = ({
  handleChageField,
  options,
  form,
  handleChangeFieldFile,
  handlePickOption,
}) => {
  return (
    <>
      {form.map((field) => {
        if (field.param === "uploads") {
          return (
            <FieldFile
              key={field.param}
              field={field}
              change={handleChangeFieldFile}
              file={!!field.value.length}
              numFiles={field.value["length"]}
              multiple
            />
          )
        } else if (field.param === "category") {
          return (
            <FieldPicker
              key={field.param}
              change={handlePickOption}
              field={field}
              options={options}
            />
          )
        }
        return (
          <Field key={field.param} change={handleChageField} field={field} />
        )
      })}
    </>
  )
}

export default ModForm
