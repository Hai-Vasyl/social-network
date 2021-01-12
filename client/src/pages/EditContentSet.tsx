import React, { useEffect, useState, useCallback } from "react"
import { useParams, useHistory } from "react-router-dom"
import { GET_CONTENTSET_SHORT } from "../fetching/queries"
import { EDIT_CONTENTSET } from "../fetching/mutations"
import { useQuery, useMutation } from "@apollo/client"
import { categories } from "../modules/contentCategories"
import { IField, IAuthErrors } from "../interfaces"
import ModForm from "../components/ModForm"
import LoaderData from "../components/LoaderData"
import Title from "../components/Title"
import Button from "../components/Button"
// @ts-ignore
import stylesForm from "../styles/form.module"
// @ts-ignore
import stylesBtn from "../styles/button.module"
import Loader from "../components/Loader"
import { BsTrash, BsX, BsCheck } from "react-icons/bs"
// @ts-ignore
import bgImage from "../images/undraw_social_dashboard_k3pt.svg"

const EditContentSet = () => {
  const { contentId }: any = useParams()
  const history = useHistory()
  const {
    data: contentSetData,
    loading: loadContentSet,
  } = useQuery(GET_CONTENTSET_SHORT, { variables: { contentSetId: contentId } })
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
  const options = Object.keys(categories).map((key) => {
    // @ts-ignore
    return { value: categories[key].keyWord, label: categories[key].label }
  })
  const [editContentSet, editCSData] = useMutation(EDIT_CONTENTSET)

  const setInitForm = useCallback(() => {
    const contentData = contentSetData && contentSetData.getContentSet
    if (contentData) {
      setForm((prevForm) =>
        prevForm.map((filed) => {
          let fieldValue = filed.value
          Object.keys(contentData).map((key) => {
            if (filed.param === key) {
              fieldValue = contentData[key]
            }
          })
          return { ...filed, value: fieldValue }
        })
      )
    }
  }, [contentSetData])

  useEffect(() => {
    setInitForm()
  }, [setInitForm])

  useEffect(() => {
    if (editCSData.error) {
      const errors: IAuthErrors = JSON.parse(
        (editCSData.error && editCSData.error.message) || "{}"
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
    } else if (editCSData.data) {
      const contentSetId = editCSData.data && editCSData.data.editContentSet

      history.push(`/content-sets/${contentSetId}`)
    }
  }, [editCSData.data, editCSData.error])

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

    editContentSet({
      variables: {
        contentSetId: contentId,
        content: content.value,
        uploads: uploads.value,
        category: category.value,
      },
    })
  }

  const handleDelete = async () => {
    console.log("delete")
  }

  const handleResetForm = async () => {
    setInitForm()
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

  if (loadContentSet) {
    return (
      <div className='wrapper'>
        <Loader />
      </div>
    )
  }

  return (
    <div className='wrapper'>
      <Title title='Edit media content' />
      <div className={stylesForm.form}>
        <div className={stylesForm.form__fields}>
          <div className='form-wrapper'>
            <LoaderData load={editCSData.loading} />
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
                title='Apply changes'
                Icon={BsCheck}
              />
              <Button
                exClass={stylesBtn.btn_simple}
                click={handleResetForm}
                title='Cancell all'
                Icon={BsX}
              />
              <Button
                exClass={stylesBtn.btn_simple}
                click={handleDelete}
                Icon={BsTrash}
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

export default EditContentSet
