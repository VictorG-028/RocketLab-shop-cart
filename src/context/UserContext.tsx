import { UserModel } from "@/models/User";
import { exampleUser } from "@/utils/createMockUser";
import { createContext, useCallback, useState } from "react";

interface UserContextModel {
  user: UserModel;
  subtractFunds: (ammount: number) => void;
  addFunds: (ammount: number) => void;
}

export const UserContext = createContext({} as UserContextModel);

interface Props {
  children: React.ReactNode;
}

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<UserModel>(exampleUser);

  const SubtractFunds = useCallback((ammount: number) => {
    user.balance -= ammount;
    setUser(user);
  }, []);

  const AddFunds = useCallback((ammount: number) => {
    user.balance += ammount;
    setUser(user);
  }, []);

  return (
    <UserContext.Provider value={{
      user: user,
      subtractFunds: SubtractFunds,
      addFunds: AddFunds,
    }}>
      {children}
    </UserContext.Provider>
  );
}
