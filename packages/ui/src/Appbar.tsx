import { Button } from "./button";

interface AppbarProps {
  user?: {
    name?: string | null;
  };
  // TODO: can u figure out what the type should be here?
  onSignin: any;
  onSignout: any;
}

export const Appbar = ({ user, onSignin, onSignout }: AppbarProps) => {
  return (
    <>
      <div className="flex justify-between border-b px-4">
        <div className="text-xl font-bold flex flex-col justify-center text-[#6a36e3]">OwnWallet</div>
        <div className="flex flex-col justify-center pt-2">
          <Button
            onClick={user ? onSignout : onSignin}
            className="bg-[#6a36e3] text-white p-2 rounded-lg mb-2"
          >
            {user ? "Logout" : "Login"}
          </Button>
        </div>
      </div>
    </>
  );
};
