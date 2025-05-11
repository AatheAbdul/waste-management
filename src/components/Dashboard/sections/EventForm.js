import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { FiCalendar, FiMapPin, FiPackage, FiFileText, FiUpload, FiCheck } from 'react-icons/fi';
import { addToCalendar } from '../../../utils/calendarUtils';

const EventForm = () => {
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    eventDate: '',
    eventTime: '',
    venueName: user?.hallName || '',
    venueAddress: user?.address || '',
    eventType: '',
    expectedAttendance: '',
    estimatedWaste: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const eventTypes = [
    { value: 'wedding', label: 'Wedding', wastePerPerson: 0.5 },
    { value: 'conference', label: 'Conference', wastePerPerson: 0.3 },
    { value: 'corporate', label: 'Corporate Event', wastePerPerson: 0.4 },
    { value: 'birthday', label: 'Birthday Party', wastePerPerson: 0.35 },
    { value: 'religious', label: 'Religious Ceremony', wastePerPerson: 0.45 },
    { value: 'other', label: 'Other', wastePerPerson: 0.4 }
  ];

  useEffect(() => {
    if (formData.eventType && formData.expectedAttendance) {
      const selectedEventType = eventTypes.find(type => type.value === formData.eventType);
      const estimatedWaste = selectedEventType
        ? (selectedEventType.wastePerPerson * parseInt(formData.expectedAttendance)).toFixed(2)
        : '';
      setFormData(prev => ({ ...prev, estimatedWaste }));
    }
  }, [formData.eventType, formData.expectedAttendance]);

  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 1:
        if (!formData.eventDate) newErrors.eventDate = 'Event date is required';
        if (!formData.eventTime) newErrors.eventTime = 'Event time is required';
        if (!formData.eventType) newErrors.eventType = 'Event type is required';
        break;
      case 2:
        if (!formData.expectedAttendance) newErrors.expectedAttendance = 'Expected attendance is required';
        if (!formData.estimatedWaste) newErrors.estimatedWaste = 'Estimated waste is required';
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        setErrors(prev => ({ ...prev, eventPermit: 'File size should not exceed 5MB' }));
        return;
      }
      setFormData(prev => ({ ...prev, eventPermit: file }));
      setErrors(prev => ({ ...prev, eventPermit: '' }));
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep === 2) {
        setShowPreview(true);
      } else {
        setCurrentStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => {
    if (showPreview) {
      setShowPreview(false);
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      setIsSubmitting(true);
      try {
        // TODO: Implement API call to save event
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulated API call
        setSubmitted(true);
        // Add to calendar
        const eventDetails = {
          title: `Event: ${formData.eventType}`,
          start: `${formData.eventDate}T${formData.eventTime}`,
          location: formData.venueAddress,
          description: formData.specialRequests
        };
        addToCalendar(eventDetails);
      } catch (error) {
        setErrors(prev => ({ ...prev, submit: 'Failed to submit form. Please try again.' }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const renderEventDetails = () => (
    <>
      <div className="form-group">
        <label>
          <FiCalendar className="input-icon" />
          Event Date & Time*
        </label>
        <div className="datetime-inputs">
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]}
            className={errors.eventDate ? 'error' : ''}
          />
          <input
            type="time"
            name="eventTime"
            value={formData.eventTime}
            onChange={handleInputChange}
            className={errors.eventTime ? 'error' : ''}
          />
        </div>
        {errors.eventDate && <span className="error-message">{errors.eventDate}</span>}
        {errors.eventTime && <span className="error-message">{errors.eventTime}</span>}
      </div>

      <div className="form-group">
        <label>
          <FiFileText className="input-icon" />
          Event Type*
        </label>
        <select
          name="eventType"
          value={formData.eventType}
          onChange={handleInputChange}
          className={errors.eventType ? 'error' : ''}
        >
          <option value="">Select Event Type</option>
          {eventTypes.map(type => (
            <option key={type.value} value={type.value}>{type.label}</option>
          ))}
        </select>
        {errors.eventType && <span className="error-message">{errors.eventType}</span>}
      </div>
    </>
  );

  const renderWasteInformation = () => (
    <>
      <div className="form-group">
        <label>
          <FiPackage className="input-icon" />
          Expected Attendance*
        </label>
        <input
          type="number"
          name="expectedAttendance"
          value={formData.expectedAttendance}
          onChange={handleInputChange}
          placeholder="Number of attendees"
          min="1"
          className={errors.expectedAttendance ? 'error' : ''}
        />
        {errors.expectedAttendance && <span className="error-message">{errors.expectedAttendance}</span>}
      </div>

      <div className="form-group">
        <label>
          <FiPackage className="input-icon" />
          Estimated Waste (kg)
        </label>
        <input
          type="number"
          name="estimatedWaste"
          value={formData.estimatedWaste}
          readOnly
          className="calculated-waste"
        />
        <small className="helper-text">
          Based on {eventTypes.find(type => type.value === formData.eventType)?.wastePerPerson || 0} kg per person
        </small>
      </div>
    </>
  );



  const renderPreview = () => (
    <div className="preview-container">
      <h3>Review Your Event Details</h3>
      <div className="preview-section">
        <h4>Event Information</h4>
        <p><strong>Date:</strong> {formData.eventDate}</p>
        <p><strong>Time:</strong> {formData.eventTime}</p>
        <p><strong>Type:</strong> {eventTypes.find(type => type.value === formData.eventType)?.label}</p>
        <p><strong>Expected Attendance:</strong> {formData.expectedAttendance}</p>
        <p><strong>Estimated Waste:</strong> {formData.estimatedWaste} kg</p>
        {formData.preferredCollectionTime && (
          <p><strong>Preferred Collection Time:</strong> {formData.preferredCollectionTime}</p>
        )}
        {formData.collectorInstructions && (
          <p><strong>Special Instructions:</strong> {formData.collectorInstructions}</p>
        )}
      </div>
    </div>
  );

  const renderConfirmation = () => (
    <div className="confirmation-container">
      <div className="confirmation-icon">
        <FiCheck size={48} color="#16a34a" />
      </div>
      <h2>Event Scheduled Successfully!</h2>
      <p>Your waste collection request has been submitted.</p>
      <p>We will notify you once a collector accepts your request.</p>
      <button
        className="calendar-button"
        onClick={() => {
          const eventDetails = {
            title: `Event: ${formData.eventType}`,
            start: `${formData.eventDate}T${formData.eventTime}`,
            location: formData.venueAddress,
            description: formData.specialRequests
          };
          addToCalendar(eventDetails);
        }}
      >
        Add to Calendar
      </button>
    </div>
  );

  if (submitted) {
    return renderConfirmation();
  }

  return (
    <div className="event-form-container">
      <h2>Schedule Event Collection</h2>
      <form onSubmit={handleSubmit} className="event-form">
        {showPreview ? (
          renderPreview()
        ) : (
          <div className="form-step">
            {currentStep === 1 && renderEventDetails()}
            {currentStep === 2 && renderWasteInformation()}
          </div>
        )}

        <div className="form-actions">
          {(currentStep > 1 || showPreview) && (
            <button type="button" onClick={handleBack} className="back-button">
              Back
            </button>
          )}
          {!showPreview && (
            <button 
              type="button" 
              onClick={handleNext} 
              className="primary-button next-button"
            >
              {currentStep === 2 ? 'Review' : 'Next'}
            </button>
          )}
          {showPreview && (
            <button 
              type="submit" 
              className="primary-button submit-button" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Event Notification'}
            </button>
          )}
        </div>
        {errors.submit && <div className="error-message">{errors.submit}</div>}
      </form>
    </div>
  );
};

export default EventForm;