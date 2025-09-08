import React from 'react'
import NotificationComp from '../../CustomerForm/StepsComp/NotificationStep/NotificationComp'
import { useDispatch } from 'react-redux';
import { updateStepData } from '../../../Redux/manufacturerFormSlice';

const NotificationsStep = ({ expandedSections, onToggleSection, formData, error, formType = "manufacturer" }) => {
    const dispatch = useDispatch();

    const handleUpdate = (data) => {
        dispatch(updateStepData({
            stepName: "step5",
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
