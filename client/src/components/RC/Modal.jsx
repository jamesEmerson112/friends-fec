import React from 'react'

const Modal = ({ open, onClose, product, currentInfo}) => {
  if (!open) return null
  const notApplicable = "Not Applicable"

  return (
    <div className = "rc-modal-style">
      <table>
        <thead>
          <tr>
            <th colSpan="3" className = "rc-modal-title">Comparing:</th>
          </tr>
          <tr>
            <th>{currentInfo.name}</th>
            <th></th>
            <th>{product.name}</th>
          </tr>
        </thead>
        <tbody>
          {currentInfo.features.map(feature => {
            return <tr>
              <td>{feature.value}</td>
              <td>{feature.feature}</td>
              <td>{notApplicable}</td>
            </tr>
          })}
          {product.features.map(feature => {
            return <tr>
              <td>{notApplicable}</td>
              <td>{feature.feature}</td>
              <td>{feature.value}</td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Modal;