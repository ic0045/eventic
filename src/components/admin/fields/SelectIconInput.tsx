import materialIcons from './materialIcons.json';
import { AutocompleteInput, useRecordContext } from "react-admin";
import { Chip, Grid, Icon, Typography } from '@mui/material';

const SelectIconInput = ({ source }: { source: any }) => {
  const record = useRecordContext();
  if (!record) return null;
  const OptionRenderer = () => {
    const record = useRecordContext();
    return (
      <span>
        <Chip icon={<Icon>{record.id}</Icon>} label={record.name} />
      </span>
    );
  };
  return (
    <AutocompleteInput fullWidth
      source={source}
      choices={materialIcons}
      optionText={<OptionRenderer />}
      inputText={(choice: any) => choice.name}
      matchSuggestion={(filter: string, choice: any) => choice.name.toLowerCase().includes(filter?.toLowerCase())}
    />
  )

};

export default SelectIconInput;