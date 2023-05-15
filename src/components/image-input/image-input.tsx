import React from 'react'
import {
  Create as CreateIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from '@mui/icons-material'
import {
  Box,
  IconButton,
  CardMedia,
} from '@mui/material'

import Progress from '~/components/progress'
import styles from './styles'

interface ImageInputProps {
  imgSrc: string
  isLoading: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onDelete: () => void
}

const ImageInput = (props: ImageInputProps) => {
  const {
    imgSrc,
    isLoading,
    onChange,
    onDelete,
  } = props

  const deleteButtonJSX = imgSrc && (
    <IconButton
      sx={styles.avatarDelete}
      onClick={onDelete}
    >
      <DeleteIcon />
    </IconButton>
  )

  const uploadIconJSX = imgSrc ? <CreateIcon /> : <AddIcon />

  const imageJSX = imgSrc ? (
    <CardMedia
      image={imgSrc}
      sx={styles.image}
    />
  ) : null

  const imagePreviewJSX = isLoading ? <Progress /> : imageJSX

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e)
  }

  return (
    <Box sx={styles.avatarUpload}>
      {deleteButtonJSX}

      <Box sx={styles.avatarEdit}>
        <IconButton
          sx={styles.label}
          component='label'
        >
          <input
            id='image-upload'
            style={styles.input}
            type='file'
            accept='.png, .jpg, .jpeg'
            onChange={handleChange}
            hidden
          />
          {uploadIconJSX}
        </IconButton>
      </Box>

      <Box sx={styles.avatarPreview}>
        {imagePreviewJSX}
      </Box>
    </Box>
  )
}

export default ImageInput
