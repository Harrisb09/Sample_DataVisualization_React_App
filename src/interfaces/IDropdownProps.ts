export interface IDropdownProps {
    items: Array<string>;
    handleSelectedChange: (event: React.ChangeEvent<{}>, value: string[]) => void;
  }