import React, { useState } from "react"
import { categories } from "../modules/contentCategories"
import Field from "../components/Field"
import FieldFile from "../components/FieldFile"
import FieldPicker from "../components/FieldPicker"
import { BsPlus } from "react-icons/bs"
import { IField } from "../interfaces"
import LoaderData from "../components/LoaderData"
import Button from "../components/Button"
// @ts-ignore
import stylesBtn from "../styles/button.module"
// @ts-ignore
import bgImage from "../images/undraw_upload_87y9.svg"

const CreateContentSet = () => {
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

  // useEffect(() => {
  //   if (editChatData.error) {
  //     const errors: IAuthErrors = JSON.parse(
  //       (editChatData.error && editChatData.error.message) || "{}"
  //     )
  //     setForm((prevForm) =>
  //       prevForm.map((field) => {
  //         let newField = { ...field, msg: "" }
  //         Object.keys(errors).forEach((key: string) => {
  //           if (key === field.param) {
  //             errors[key].msg &&
  //               errors[key].msg.forEach((msg) => {
  //                 newField.msg += ` ${msg}`
  //               })
  //             newField.msg = newField.msg.trim()
  //           }
  //         })
  //         return newField
  //       })
  //     )
  //   } else if (editChatData.data) {
  //     const newChat = editChatData.data && editChatData.data.editChat
  //     dispatch({
  //       type: SET_CHATS,
  //       payload: [...chats].map((chat) => {
  //         if (chat.id === newChat.id) {
  //           return newChat
  //         }
  //         return chat
  //       }),
  //     })
  //     setFlipSettings(false)
  //   }
  // }, [dispatch, editChatData.data, editChatData.error])

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
    // const [title, description, _, type] = form
    // editChat({
    //   variables: {
    //     title: title.value,
    //     description: description.value,
    //     image: chatImage,
    //     type: type.value,
    //     id: route.chatId,
    //   },
    // })
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

  const fields = form.map((field) => {
    if (field.param === "uploads") {
      return (
        <FieldFile
          key={field.param}
          field={field}
          change={handleChangeFieldFile}
          file={!!field.value.length}
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
    return <Field key={field.param} change={handleChageField} field={field} />
  })

  return (
    <div className='wrapper'>
      <div>
        <div>
          <div className='form-wrapper'>
            {/* <LoaderData load={createChatData.loading} /> */}
            {fields}
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
        <div>
          <img src={bgImage} alt='bgImage' />
        </div>
      </div>
    </div>
  )
}

export default CreateContentSet
