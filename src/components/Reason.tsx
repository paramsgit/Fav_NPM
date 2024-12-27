import { Button, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
type Props = {
  SelectedPackage: string;
  ApiResult: any;
  setSelectedPackage: React.Dispatch<React.SetStateAction<string>>;
  toast: typeof toast;

};
interface FavoritePackage {
  id: string;
  packageName: string;
  description: string;
  addedAt: string;
}


function isPackageFound(packages: any, searchString: string): boolean {
  return packages.some((pkg: any) => pkg.package.name.includes(searchString));
}

const FavouriteReason = (props: Props) => {
  const { SelectedPackage, ApiResult,setSelectedPackage,toast } = props;
  const [reason, setReason] = useState("");
  function addFavoritePackage(packageName: string, description: string): void {
    const existingFavorites: FavoritePackage[] = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );
    
    const isPackageExists = existingFavorites.some(pkg => pkg.packageName === packageName); 
    if (isPackageExists) 
      { console.log(`Package with name "${packageName}" already exists.`);
    toast.error(`Package with name "${packageName}" already exists.`,{position:"bottom-right"})
    return; }
  
    const newFavorite: FavoritePackage = {
      id: uuidv4(),
      packageName,
      description,
      addedAt: new Date().toISOString(),
    };
    existingFavorites.push(newFavorite);
    localStorage.setItem("favorites", JSON.stringify(existingFavorites));
    console.log("New favorite added:", newFavorite);
    toast.success(`${packageName} favorite added`,{position:"bottom-right"})
    setSelectedPackage("")
    setReason("")
  }
  const handleSubmit = () => {
    if (!SelectedPackage || !isPackageFound(ApiResult, SelectedPackage)) {
       console.log("Something went wrong");
      toast.error(`Something went erong.`,{position:"bottom-right"});
      return;

    }
    if (!reason) {
      toast.error(`Description is required`,{position:"bottom-right",style:{height:"3px"}})
      return;
    }
    addFavoritePackage(SelectedPackage,reason);
    console.log("Added success")
 
  };

  return (
    <div className="flex flex-col items-center w-full mt-6">
      <Textarea
        isClearable
        className="max-w-xl bg-white"
        label="Description"
        value={reason}
        onValueChange={(e) => setReason(e)}
        placeholder="Why this is your favourite package manager"
        variant="bordered"
        // eslint-disable-next-line no-console
        onClear={() => console.log("textarea cleared")}
      />
      <Button
        onPress={handleSubmit}
        className="w-full max-w-sm my-4 bg-black text-white"
        size="sm"
      >
        Submit
      </Button>
    </div>
  );
};

export default FavouriteReason;
