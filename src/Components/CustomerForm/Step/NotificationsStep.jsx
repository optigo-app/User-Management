import React from 'react'
import NotificationComp from '../StepsComp/NotificationStep/NotificationComp'
import { useDispatch } from 'react-redux';
import { updateStepData } from '../../../Redux/customerFormSlice';

const NotificationsStep = ({expandedSections, onToggleSection, formData, error, formType = "customer"}) => {
    const dispatch = useDispatch();

    const handleUpdate = (data) => {
        dispatch(updateStepData({
            stepName: "step6",
            formData: data
        }));
    };
  return (
    <div>
        <NotificationComp 
            expandedSections={expandedSections}
            onToggleSection={onToggleSection}
            formData={formData}
            error={error}
            onUpdate={handleUpdate}
            formType={formType}
        />
    </div>
  )
}

export default NotificationsStep