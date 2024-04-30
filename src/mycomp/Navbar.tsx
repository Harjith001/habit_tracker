import { ModeToggle } from "@/components/toggle-button";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { Link } from "@radix-ui/react-navigation-menu";
import { BookOpenCheck } from "lucide-react";

const Navbar = ()=>{
    return(
        <section className="flex flex-row justify-between items-center px-5 py-3 border-b backdrop-blur-sm">
            <div className="flex flex-row items-center">
                <BookOpenCheck className="m-2"/>
                <h3 className="scroll-m-20 text-2xl font-bold tracking-tight">
                    Habify
                </h3>
            </div>
            <div>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <Link href="/">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Track
                            </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                        <Link href="/">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Progress
                            </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem>
                        <Link href="/">
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                About
                            </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <ModeToggle/>
        </section>
    );
}

export default Navbar;