import useBodyClass from './useBodyClass'

const ModalBodyClass = props => {
  const { isModalVisible } = props
  useBodyClass(isModalVisible ? 'modalOpen' : 'modalClose')
  return null
}
export default ModalBodyClass
