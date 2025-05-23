import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useUpdateSetting from "./useUpdateSetting";
import useSettings from "./useSettings";

function UpdateSettingsForm() {
  const {
    settings: {
      breakfast,
      maxBookLength,
      maxGuestsPerBooking,
      minBookLength,
    } = {},
    isSettingsLoading,
  } = useSettings();
  const { updateSetting, isSettingUpdating } = useUpdateSetting();

  function handleUpdate(value, field) {
    if (!value) return;

    updateSetting({ [field]: value });
  }

  if (isSettingsLoading) return <Spinner />;
  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          defaultValue={minBookLength}
          onBlur={(e) => handleUpdate(e.target.value, "minBookLength")}
          disabled={isSettingUpdating}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          defaultValue={maxBookLength}
          onBlur={(e) => handleUpdate(e.target.value, "maxBookLength")}
          disabled={isSettingUpdating}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          defaultValue={maxGuestsPerBooking}
          onBlur={(e) => handleUpdate(e.target.value, "maxGuestsPerBooking")}
          disabled={isSettingUpdating}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          defaultValue={breakfast}
          onBlur={(e) => handleUpdate(e.target.value, "breakfast")}
          disabled={isSettingUpdating}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
