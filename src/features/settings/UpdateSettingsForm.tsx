import Spinner from '../../ui/Spinner';

import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import useFetchSettings from '../../hooks/setting/useFetchSettings';
import useUpdateSetting from '../../hooks/setting/useUpdateSetting';
import { updateSetting } from '../../services/apiSettings';

function UpdateSettingsForm() {
  const { settings, isPending, error } = useFetchSettings();
  const { updateSetting, isUpdating } = useUpdateSetting();

  if (isPending) return <Spinner />;

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement, Element>,
    field: string,
  ) {
    const { value } = e.target;

    if (!value) return;
    updateSetting({ [field]: Number(value) });
  }

  // This time we are using UNCONTROLLED fields, so we will NOT store state
  return (
    <Form type='modal'>
      <FormRow label='Minimum nights/booking'>
        <Input
          type='number'
          defaultValue={settings?.minBookingLength}
          onBlur={e => handleBlur(e, 'minBookingLength')}
          disabled={isUpdating}
          id='min-nights'
        />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input
          type='number'
          defaultValue={settings?.maxBookingLength}
          onBlur={e => handleBlur(e, 'maxBookingLength')}
          disabled={isUpdating}
          id='max-nights'
        />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input
          type='number'
          defaultValue={settings?.maxGuestsPerBooking}
          onBlur={e => handleBlur(e, 'maxGuestsPerBooking')}
          disabled={isUpdating}
          id='max-guests'
        />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input
          type='number'
          defaultValue={settings?.breakfastPrice}
          onBlur={e => handleBlur(e, 'breakfastPrice')}
          disabled={isUpdating}
          id='breakfast-price'
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
