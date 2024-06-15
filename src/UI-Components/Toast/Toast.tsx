import { useDispatch, useSelector } from "react-redux";
import { showError, showSuccess } from "../../store/slices/Toast";
import { RootState } from "../../store/store";
import Toast from "../../Components/Toast/Toast";

export const ToastUI = () => {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state: RootState) => state.toast);
  const { message: errorMessage, title: errorTitle } = error || {};
  const { message: successMessage, title: successTitle } = success || {};

  const onErrorClose = () => {
    dispatch(showError(null));
  };

  const onSuccessClose = () => {
    dispatch(showSuccess(null));
  };

  return (
    <div className="fixed -right-4 bottom-4 z-toast">
      {/* Error Toast */}
      <Toast.Provider>
        <Toast.Root
          open={Boolean(error)}
          customType="error"
          size="regular"
          onOpenChange={onErrorClose}
        >
          <Toast.Title>{errorTitle}</Toast.Title>
          <Toast.Description>{errorMessage}</Toast.Description>
          <Toast.Close onClose={onErrorClose} />
        </Toast.Root>
      </Toast.Provider>

      {/* Success Toast */}
      <Toast.Provider>
        <Toast.Root
          open={Boolean(success)}
          customType="success"
          size="regular"
          onOpenChange={onSuccessClose}
        >
          <Toast.Title>{successTitle}</Toast.Title>
          <Toast.Description>{successMessage}</Toast.Description>
          <Toast.Close onClose={onSuccessClose} />
        </Toast.Root>
      </Toast.Provider>
    </div>
  );
};
