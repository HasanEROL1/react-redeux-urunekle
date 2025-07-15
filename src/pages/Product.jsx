import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import Modal from '../components/Modal'
import Button from '../components/Button'
import Input from '../components/Input'
import { createDataFunc, updateDataFunc } from '../redux/dataSlice'
import { useEffect, useState } from 'react'
import { modalFunc } from '../redux/modalSlice'
import { useLocation, useNavigate } from 'react-router-dom'

const Product = () => {
    const { modal } = useSelector(state => state.modal)
    const { data, keyword } = useSelector(state => state.data)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    // URL'den ?id= şeklinde gelen değeri alıyoruz ve tam sayı yapıyoruz
    const loc = parseInt(location.search.split('=')[1])

    const [productInfo, setProductInfo] = useState({ name: "", price: "", url: "" })

    // input değişimlerini yönetiyoruz
    const onChangeFunc = (e, type) => {
        if (type === "url") {
            const file = e.target.files?.[0]
            if (!file) return

            const reader = new FileReader()
            reader.onloadend = () => {
                setProductInfo(prev => ({ ...prev, url: reader.result })) // base64 olarak kaydet
            }
            reader.readAsDataURL(file)
        } else {
            setProductInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))
        }
    }

    // sayfa yüklendiğinde, loc varsa ürün bilgilerini getir ve formu doldur
    useEffect(() => {
        if (loc) {
            const found = data.find(dt => dt.id === loc);
            if (found) setProductInfo(found);
            else setProductInfo({ name: "", price: "", url: "" });
        } else {
            setProductInfo({ name: "", price: "", url: "" });
        }
    }, [loc, data]);


    // Butona tıklandığında çağrılacak fonksiyon
    const buttonFunc = () => {
        if (loc) {
            dispatch(updateDataFunc({ ...productInfo, id: loc }))  // güncelle
        } else {
            dispatch(createDataFunc({ ...productInfo, id: data.length + 1 }))  // yeni ürün ekle
        }
        dispatch(modalFunc()) // modalı kapat
        navigate("/product")   // sayfayı yenile veya yönlendir
    }

    // Modal içeriği (inputlar ve buton)
    const contentModal = (
        <>
            <Input
                value={productInfo?.name || ""}
                type="text"
                placeholder="Ürün Adı"
                name="name"
                id="name"
                onChange={e => onChangeFunc(e, "name")}
            />
            <Input
                value={productInfo?.price || ""}
                type="text"
                placeholder="Fiyat"
                name="price"
                id="price"
                onChange={e => onChangeFunc(e, "price")}
            />
            <Input
                type="file"
                placeholder="Resim Seç"
                name="url"
                id="url"
                onChange={e => onChangeFunc(e, "url")}
            />
            <Button btnText={loc ? "Ürün Güncelle" : "Ürün Oluştur"} onClick={buttonFunc} />
        </>
    )
    const filteredItems = data.filter(dt => dt.name.toLowerCase().includes(keyword))

    return (
        <div>
            <div className='flex g-4 flex-wrap'>
                {filteredItems?.map((dt, i) => (
                    <ProductCard key={i} dt={dt} />
                ))}
            </div>

            {modal && (
                <Modal
                    content={contentModal}
                    title={loc ? "Ürün Güncelle" : "Ürün Oluştur"}
                    btnFunc={buttonFunc}
                />
            )}
        </div>
    )
}

export default Product
