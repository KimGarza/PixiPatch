import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { useItemCtx } from "@/src/hooks/contexts/useItemCtx";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import GlobalTheme from "@/src/hooks/contexts/GlobalTheme";

const { colors } = GlobalTheme();

const TrashButton = () => {
  const [disabled, setDisabled] = useState(false);
  const { activeItemCtx, deleteItem, updatePendingChanges } = useItemCtx();  // Access context with active item and delete functionality

  const handleDelete = () => {
    
    if (activeItemCtx) {
      updatePendingChanges();
      deleteItem();
     }

    setTimeout(() => {
      setDisabled(false); // Re-enable the button after 500ms
    }, 500);
  };

  return (
    <>
      {activeItemCtx ? ( // Conditionally render the trash icon if there's an active item
        <TouchableOpacity 
          onPressIn={handleDelete}
          disabled={disabled} // Disable button when needed
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <FontAwesome name="trash-o" size={45} color={colors.FireyPink}/>
        </TouchableOpacity>
      ) : null}
    </>
  );
};

export default TrashButton;