import RestModel from "model/rest";
import Api from "common/api";
import {DateTime} from "luxon";

export class Album extends RestModel {
    getDefaults() {
        return {
            ID: 0,
            CoverUUID: "",
            AlbumUUID: "",
            AlbumSlug: "",
            AlbumName: "",
            AlbumDescription: "",
            AlbumNotes: "",
            AlbumOrder: "",
            AlbumTemplate: "",
            AlbumFavorite: true,
            Links: [],
            CreatedAt: "",
            UpdatedAt: "",
        };
    }

    getEntityName() {
        return this.AlbumSlug;
    }

    getId() {
        return this.AlbumUUID;
    }

    getTitle() {
        return this.AlbumName;
    }

    thumbnailUrl(type) {
        return "/api/v1/albums/" + this.getId() + "/thumbnail/" + type;
    }

    thumbnailSrcset() {
        const result = [];

        result.push(this.thumbnailUrl("fit_720") + " 720w");
        result.push(this.thumbnailUrl("fit_1280") + " 1280w");
        result.push(this.thumbnailUrl("fit_1920") + " 1920w");
        result.push(this.thumbnailUrl("fit_2560") + " 2560w");
        result.push(this.thumbnailUrl("fit_3840") + " 3840w");

        return result.join(", ");
    }

    thumbnailSizes() {
        const result = [];

        result.push("(min-width: 2560px) 3840px");
        result.push("(min-width: 1920px) 2560px");
        result.push("(min-width: 1280px) 1920px");
        result.push("(min-width: 720px) 1280px");
        result.push("720px");

        return result.join(", ");
    }

    getDateString() {
        return DateTime.fromISO(this.CreatedAt).toLocaleString(DateTime.DATETIME_MED);
    }

    toggleLike() {
        this.AlbumFavorite = !this.AlbumFavorite;

        if (this.AlbumFavorite) {
            return Api.post(this.getEntityResource() + "/like");
        } else {
            return Api.delete(this.getEntityResource() + "/like");
        }
    }

    like() {
        this.AlbumFavorite = true;
        return Api.post(this.getEntityResource() + "/like");
    }

    unlike() {
        this.AlbumFavorite = false;
        return Api.delete(this.getEntityResource() + "/like");
    }

    static getCollectionResource() {
        return "albums";
    }

    static getModelName() {
        return "Album";
    }
}

export default Album;
