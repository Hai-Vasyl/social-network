import React, { useState, useEffect } from "react"
import { categories } from "../modules/contentCategories"
import { BsPlus } from "react-icons/bs"
import { IField, IAuthErrors } from "../interfaces"
import LoaderData from "../components/LoaderData"
import Button from "../components/Button"
import Title from "../components/Title"
// @ts-ignore
import stylesBtn from "../styles/button.module"
// @ts-ignore
import stylesForm from "../styles/form.module"
// @ts-ignore
import bgImage from "../images/undraw_upload_87y9.svg"
import { CREATE_CONTENTSET } from "../fetching/mutations"
import { useMutation } from "@apollo/client"
import { useHistory } from "react-router-dom"
import ModForm from "../components/ModForm"

const CreateContentSet = () => {
  const history = useHistory()
  const [form, setForm] = useState<IField[]>([
    {
      param: "content",
      type: "text",
      value: "",
      title: "Description",
      msg: "",
    },
    {
      param: "uploads",
      type: "files",
      value: [],
      title: "Upload media",
      msg: "",
    },
    {
      param: "category",
      type: "text",
      value: categories.nature.keyWord,
      title: "Category",
      msg: "",
    },
  ])
  const [createContentSet, createDSData] = useMutation(CREATE_CONTENTSET)

  const options = Object.keys(categories).map((key) => {
    // @ts-ignore
    return { value: categories[key].keyWord, label: categories[key].label }
  })

  useEffect(() => {
    if (createDSData.error) {
      const errors: IAuthErrors = JSON.parse(
        (createDSData.error && createDSData.error.message) || "{}"
      )
      setForm((prevForm) =>
        prevForm.map((field) => {
          let newField = { ...field, msg: "" }
          Object.keys(errors).forEach((key: string) => {
            if (key === field.param) {
              errors[key].msg &&
                errors[key].msg.forEach((msg) => {
                  newField.msg += ` ${msg}`
                })
              newField.msg = newField.msg.trim()
            }
          })
          return newField
        })
      )
    } else if (createDSData.data) {
      const contentSetId =
        createDSData.data && createDSData.data.createContentSet

      history.push(`/content-sets/${contentSetId}`)
    }
  }, [createDSData.data, createDSData.error])

  const handleChageField = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) =>
      prevForm.map((field) => {
        if (event.target.name === field.param) {
          return { ...field, msg: "", value: event.target.value }
        }
        return field
      })
    )
  }

  const handleChangeFieldFile = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((prevForm) =>
      prevForm.map((field) => {
        if (field.param === "uploads") {
          return { ...field, value: event.target.files, msg: "" }
        }
        return field
      })
    )
  }

  const handleSubmitForm = async () => {
    const [content, uploads, category] = form
    createContentSet({
      variables: {
        content: content.value,
        uploads: uploads.value,
        category: category.value,
      },
    })
  }

  const handlePickOption = (value: string) => {
    setForm((prevForm) =>
      prevForm.map((field) => {
        if (field.param === "category") {
          return { ...field, value, msg: "" }
        }
        return field
      })
    )
  }

  return (
    <div className='wrapper'>
      <Title title='Create new media content' />
      <div className={stylesForm.form}>
        <div className={stylesForm.form__fields}>
          <div className='form-wrapper'>
            <LoaderData load={createDSData.loading} />
            <ModForm
              handleChangeFieldFile={handleChangeFieldFile}
              handlePickOption={handlePickOption}
              form={form}
              options={options}
              handleChageField={handleChageField}
            />
            <div className={stylesBtn.btns}>
              <Button
                exClass={stylesBtn.btn_primary}
                click={handleSubmitForm}
                title='Create content'
                Icon={BsPlus}
              />
            </div>
          </div>
        </div>
        <div className={stylesForm.form__bgImage}>
          <img src={bgImage} className={stylesForm.form__image} alt='bgImage' />
        </div>
      </div>
    </div>
  )
}

export default CreateContentSet
