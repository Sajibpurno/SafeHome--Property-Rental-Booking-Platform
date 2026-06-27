
import {Bell, Envelope, Gear, House, LayoutSideContentLeft, Magnifier, Person} from "@gravity-ui/icons";
import {Button, Drawer} from "@heroui/react";
import { Briefcase } from "lucide-react";
import Link from "next/link";

const DeshboardSidebar = () => {
     const navItems = [
    {icon: House, href:'/deshboard/recruiter', label: "Home"},
    {icon: Magnifier, href:'/deshboard/recruiter/jobs', label: "Jobs"},
    {icon: Bell, href:'/deshboard/recruiter/jobs/new', label: "Create A Job"},
    {icon: Briefcase, href:'/deshboard/recruiter/company', label: "Company Profile"},
    {icon: Envelope,href:'/deshboard/recruiter/message', label: "Messages"},
    {icon: Person, href:'/deshboard/recruiter/profile', label: "Profile"},
    {icon: Gear, href:'/deshboard/recruiter/Setting', label: "Settings"},
  ];

  const navContent = <nav className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                    href={item.href}
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </Link>
                ))}
              </nav>
    return (
      <>
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>
      <Drawer>
      <Button className='lg:hidden' variant="secondary">
        <LayoutSideContentLeft/>
      Sidebar
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              {navContent}
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
     </Drawer>
      </>
    );
};

export default DeshboardSidebar;