import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import logo from "../assets/carrinho.png";
import { WalletIcon } from 'lucide-react';
import { UserModel } from '@/models/User';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from './ui/button';
import { useUser } from '@/hooks/UseUser';
import toast from 'react-hot-toast';
import { useState } from 'react';

interface Props {
  children?: React.ReactNode;
  routeName?: string;
}

function Start(_navigate: NavigateFunction) {
  return (
    <div className="justify-start mt-1 ml-6 flex flex-row items-center">
      <Link to={'/home'} className="flex flex-row items-center space-x-2.5 cursor-pointer">
        <img src={logo} className="w-12 h-12"></img>
        <p className="w-28 text-secondary font-mono">Loljinha</p>
      </Link>
    </div>
  );
}


function Center(_navigate: NavigateFunction, children: React.ReactNode, user: UserModel, addFunds: (ammount: number) => void) {
  const [ dummyState, forceUpdate ] = useState(0);

  function handleWalletClick() {
    toast("Fundos adicionados");
    addFunds(500);
    forceUpdate(dummyState === 0 ? 1 : 0);
  }
  
  return (
    <div className="justify-center">
      <div className="flex flex-row items-center sm:space-x-2 text-green-100">
        {children}
        <TooltipProvider>
          <Button variant="link" onClick={() => {handleWalletClick()}}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost"><WalletIcon></WalletIcon></Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{user.currency} {user.balance.toFixed(2)}</p>
                </TooltipContent>
              </Tooltip>
          </Button>
        </TooltipProvider>
      </div>
    </div>
  );
}

function End(_navigate: NavigateFunction, routeName?: string) {
  return (
    <div className="justify-end mr-8 space-x-4 flex flex-row items-center">
      <Link to={'/home'} className={`${routeName === "home" ? "font-bold" : "font-normal"}`}>Loja</Link>
      <Link to={'/orders'} className={`${routeName === "orders" ? "font-bold" : "font-normal"}`}>Suas compras</Link>
    </div>
  );
}     

export default function Navbar({ routeName, children }: Props) {
  const navigate = useNavigate();
  const { user, addFunds } = useUser();

  return (
    <nav className="w-full h-20 sm:h-24 bg-slate-400 backdrop-filter backdrop-blur-[4px]">
      <div className="container text-white h-20 flex flex-row justify-between items-center sm:space-x-5">
        {Start(navigate)}
        {Center(navigate, children, user, addFunds)}
        {End(navigate, routeName)}
      </div >
    </nav >
  );
}
